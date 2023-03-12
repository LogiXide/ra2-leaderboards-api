import { format } from "util";

const isObject = (obj: object) => obj != null && obj.constructor.name === "Object";

export enum Realm {
  Postgres = "postgres:",
}

export class Reference {
  path: string;
  template?: string;

  constructor(path: string, template?: string) {
    this.path = path;
    this.template = template;
  }

  resolveFromContext(context: any) {
    const elements = this.path.split(".");
    const result = elements.reduce(function (obj: any, prop: any) {
      return obj?.[prop];
    }, context);

    return this.template ? format(this.template, result) : result;
  }
}

export type Ref = (path: string, template?: string) => Reference

export default class TestDataBuilder {
  definitions: Array<any>;
  session: unknown;
  realm: Realm;
  context: any;

  constructor(session: unknown, realm: Realm) {
    this.definitions = [];
    this.session = session;
    this.realm = realm;
  }

  define(name: string, model: any, properties: any, args: any, options: any) {
    this.definitions.push({ name, model, properties, args, options });

    return this;
  }

  async buildTo(context: any) {
    this.context = context;

    for (const definition of this.definitions) {
      await this.buildObject(definition);
    }
  }

  async buildObject(definition: any) {
    const values = { ...(definition.properties || {}) };
    const resolvedValues = this.resolveValues(values);

    const args = { ...(definition.args || {}) };
    const resolvedArgs = this.resolveValues(args);

    const options = { ...(definition.options || {}) };

    try {
      const method = options.method || "create";
      const result = await definition.model(this.session)[method](resolvedValues, resolvedArgs);

      if (this.realm === Realm.Postgres && method === "create") {
        this.context[definition.name] = result;
      }
    } catch (err) {
      console.debug(resolvedValues, resolvedArgs);
      console.debug(resolvedValues, resolvedArgs);
      console.error("Cannot build object %j - %s", definition, (err as Error).message);
      throw err;
    }
  }

  resolveValues(values: any) {
    const result: any = {};

    for (const key in values) {
      let val = values[key];
      if (val instanceof Reference) {
        val = values[key].resolveFromContext(this.context);
      } else if (Array.isArray(val)) {
        val = values[key].map((obj: any) => {
          return obj.resolveFromContext ? obj.resolveFromContext(this.context) : obj;
        }, this);
      } else if (isObject(val)) {
        val = this.resolveValues(val);
      }
      result[key] = val;
    }

    return result;
  }

  static ref(path: string, template?: string): Reference {
    return new Reference(path, template);
  }
}
