SET SQL_MODE = '';

SET CHARACTER_SET_CLIENT = utf8;

SET CHARACTER_SET_CONNECTION = utf8;


SET SQL_MODE = '';

SET CHARACTER_SET_CLIENT = utf8;

SET CHARACTER_SET_CONNECTION = utf8;


-- Project Name : def_academy
-- Date/Time    : 2021/09/13 15:32:26
-- Author       : dai.yamamoto
-- RDBMS Type   : MySQL
-- Application  : A5:SQL Mk-2

-- クイズ
drop table if exists `leaf_quiz` cascade;

create table `leaf_quiz` (
  `quiz_id` bigint(20) AUTO_INCREMENT
  , `quiz_title` VARCHAR(256)
  , `quiz_contents` MEDIUMTEXT
  , `quiz_auther` VARCHAR(32)
  , `sys_insert_dt` DATETIME default CURRENT_TIMESTAMP not null comment '挿入日時'
  , `sys_update_dt` DATETIME default  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新日時'
  , `sys_delete_dt` DATETIME comment '削除日時'
  , constraint `leaf_quiz_PKC` primary key (`quiz_id`)
) comment 'クイズ' ;

-- ユーザー
drop table if exists `users` cascade;

create table `users` (
  `user_id` VARCHAR(32) comment 'ユーザーID'
  , `family_name` VARCHAR(64) comment '氏'
  , `first_name` VARCHAR(64) comment '名'
  , `display_name` VARCHAR(64) comment 'アカウント名'
  , `email` VARCHAR(256) comment 'メールアドレス'
  , `join_dt` DATETIME comment '登録日時'
  , `last_login_dt` DATETIME comment '最終ログイン日時'
  , `login_count` INT comment 'ログイン回数'
  , `password_hash` VARCHAR(256) comment 'パスワードハッシュ'
  , `photo_url` VARCHAR(256) comment '写真URL'
  , `email_verified` TINYINT(1) comment 'メール確認'
  , `sys_insert_dt` DATETIME default CURRENT_TIMESTAMP not null comment '挿入日時'
  , `sys_update_dt` DATETIME default  CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '更新日時'
  , `sys_delete_dt` DATETIME comment '削除日時'
  , constraint `users_PKC` primary key (`user_id`)
) comment 'ユーザー' ;

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

