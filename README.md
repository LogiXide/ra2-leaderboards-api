# Red Alert 2 Leaderboards API

## Development

```shell
docker-compose up
npm install
npm run db:migrate
npm run start:dev
```


## Database
```shell
# New migration
npm run db:migrate:create -- --name new-migration

# New seed
npm run db:seeds:create -- --name new-seed
```


## Formatting & Linters

```shell
npm run lint
```

## Tests

```shell
npm test
```