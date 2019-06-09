# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

##　 userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|ndex: true, null: false,|
|e-mail|string|null: false|

### Association
- has_many :group
- has_many :massage
- has_many :members

##  groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- has_many :message
- has_many :users

##  messageテーブル

|Column|Type|Options|
|------|----|-------| 
|body|text|null: false|
|image|string|foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belong_to :user
- belong_to :group
