drop database if exists GuateCultura_in5cm;
create database GuateCultura_in5cm;
use GuateCultura_in5cm;

create table Users(
	user_id int auto_increment primary key not null,
    nombre_usuario varchar(100) not null,
    email varchar(100) not null,
    password_hash text not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    rol ENUM("USER", "CREATOR", "ADMIN") not null,
    created_at timestamp default current_timestamp
);

create table Creators(
	creator_id int auto_increment primary key not null,
	FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id),
    bio text,
    profile_img mediumblob,
    created_at timestamp default current_timestamp
);

create table Productions(
	production_id int primary key not null auto_increment,
    FK_creator_id int not null,
    foreign key (FK_creator_id) references Creators(creator_id),
    title varchar(100) not null,
    description text,
    category ENUM("MUSIC", "LITERATURE", "CINEMA"),
    visibility ENUM("PUBLIC", "PRIVATE", "DRAFT") not null,
    created_at timestamp default current_timestamp
);

create table ProductionFiles(
	file_id int primary key not null auto_increment,
    FK_production_id int not null,
    foreign key (FK_production_id) references Productions(production_id),
    file_content longblob not null,
    file_type ENUM("VIDEO", "IMAGE", "PDF", "AUDIO")
);

create table Followers(
	follower_id int auto_increment not null primary key,
    FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id),
    FK_creator_id int not null,
    foreign key (FK_creator_id) references Creators(creator_id),
	created_at timestamp default current_timestamp
);

create table Playlists(
	playlist_id int auto_increment not null primary key,
    FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id),
    title varchar(100),
    created_at timestamp default current_timestamp
);

create table PlaylistItems(
	item_id int auto_increment not null primary key,
    FK_playlist_id int not null,
    foreign key (FK_playlist_id) references Playlists(playlist_id),
    FK_production_id int not null,
    foreign key (FK_production_id) references Productions(production_id)
);

create table Posts(
	post_id int auto_increment not null primary key,
    FK_creator_id int not null,
    title varchar(100) not null,
    description text,
	created_at timestamp default current_timestamp
);

create table PostMedia(
	media_id int auto_increment not null primary key,
    FK_post_id int not null,
    foreign key (FK_post_id) references Posts(post_id),
    media_content longblob,
    media_type ENUM("VIDEO", "IMAGE", "PDF", "AUDIO")
);

create table Likes(
	like_id int auto_increment not null primary key,
    FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id),
    FK_production_id int,
    foreign key (FK_production_id) references Productions(production_id),
    FK_post_id int,
    foreign key (FK_post_id) references Posts(post_id),
    created_at timestamp default current_timestamp
);

create table Comments(
	comment_id int auto_increment not null primary key,
    content text not null,
    FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id),
    FK_production_id int,
    foreign key (FK_production_id) references Productions(production_id),
    FK_post_id int,
    foreign key (FK_post_id) references Posts(post_id),
    created_at timestamp default current_timestamp
);


