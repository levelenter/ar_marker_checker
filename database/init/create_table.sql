SET SQL_MODE = '';

SET CHARACTER_SET_CLIENT = utf8;

SET CHARACTER_SET_CONNECTION = utf8;


-- Project Name : def_academy
-- Date/Time    : 2021/06/17 15:48:12
-- Author       : dai.yamamoto
-- RDBMS Type   : MySQL
-- Application  : A5:SQL Mk-2

-- サンプルテーブル
drop table if exists `sample_table` cascade;

create table `sample_table` (
  `id` bigint(20) AUTO_INCREMENT comment 'ID'
  , `create_dt` DATETIME comment '作成日'
  , `memo` MEDIUMTEXT comment 'メモ'
  , `sys_insert_dt` DATETIME default CURRENT_TIMESTAMP not null comment '挿入日時'
  , `sys_update_dt` DATETIME default  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新日時'
  , `sys_delete_dt` DATETIME comment '削除日時'
  , constraint `sample_table_PKC` primary key (`id`)
) comment 'サンプルテーブル' ;

