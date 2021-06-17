SET SQL_MODE = '';

SET CHARACTER_SET_CLIENT = utf8;

SET CHARACTER_SET_CONNECTION = utf8;


SET SQL_MODE = '';

SET CHARACTER_SET_CLIENT = utf8;

SET CHARACTER_SET_CONNECTION = utf8;


-- Project Name : Sample Table
-- Date/Time    : 2021/02/09 14:02:21
-- Author       : dai.yamamoto
-- RDBMS Type   : MySQL
-- Application  : A5:SQL Mk-2

drop table if exists `example` cascade;

create table `example` (
  `example_id` bigint(20) AUTO_INCREMENT comment 'ID'
  , `comment` MEDIUMTEXT comment 'コメント'
  , `sys_insert_dt` DATETIME default CURRENT_TIMESTAMP not null comment '挿入日時'
  , `sys_update_dt` DATETIME default  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新日時'
  , `sys_delete_dt` DATETIME comment '削除日時'
  , constraint `example_PKC` primary key (`example_id`)
) comment 'サンプルテーブル' ;
