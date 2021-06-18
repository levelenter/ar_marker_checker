# vue-docker-aframe

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Database Command

```
mysql --defaults-extra-file=./database/conf/init.cnf --default-character-set=utf8mb4  < ./build/database/init/import_table.sql
```

```
mysqldump --defaults-extra-file=./database/conf/dump_init.cnf --default-character-set=utf8mb4 -r ../backup/database1_bk_0101.sql --single-transaction database1
```

### Database backup をローカルへ

ローカルで実行

```
scp root@brockvrocks.com:backup/database1_bk_0101.sql  /Users/dai/projects/le-serverside/__dev/backup
```

### Test Rest Curl

```
curl -X GET -H "Content-Type: application/json" localhost:3002/v1/TestService/getByNote
```
