// // import { NonAbstract, Model } from 'sequelize-typescript';

declare module 'sequelize-typescript/model/model/model' {
  export const INFER_ALIAS_MAP: {
    bulkBuild: number;
    build: number;
    create: number;
    aggregate: number;
    all: number;
    find: number;
    findAll: number;
    findAndCount: number;
    findAndCountAll: number;
    findById: number;
    findByPrimary: number;
    findCreateFind: number;
    findOne: number;
    findOrBuild: number;
    findOrCreate: number;
    findOrInitialize: number;
    reload: number;
    paginate: number;
};
}



// // import { NonAbstract } from '../../shared/types';
// // import { Model } from '../..';
// // export declare type Repository<M> = (new () => M) & NonAbstract<typeof Model>;



// // // declare static paginate: (
// //   //   options: PaginateOptions<Map>,
// //   // ) => Promise<PaginationConnection<Map>>;
