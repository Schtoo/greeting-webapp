drop table users;
create table users(
    id serial not null primary key,
    names text not null unique,
    count int default 0
);
