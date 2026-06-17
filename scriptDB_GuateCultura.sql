drop database if exists GuateCultura_in5cm;
create database GuateCultura_in5cm;
use GuateCultura_in5cm;

create table Users(
	user_id int auto_increment primary key not null,
    nombre_usuario varchar(100) not null unique,
    email varchar(100) not null unique,
    password_hash text not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    rol ENUM("USER", "CREATOR", "ADMIN") not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table Creators(
	creator_id int auto_increment primary key not null,
	FK_user_id int not null unique,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    bio text,
    profile_img varchar(500),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table Productions(
	production_id int primary key not null auto_increment,
    FK_creator_id int not null,
    foreign key (FK_creator_id) references Creators(creator_id) on delete cascade,
    title varchar(100) not null,
    description text,
    category ENUM("MUSIC", "LITERATURE", "CINEMA"),
    visibility ENUM("PUBLIC", "PRIVATE", "DRAFT") not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table ProductionFiles(
	file_id int primary key not null auto_increment,
    FK_production_id int not null,
    foreign key (FK_production_id) references Productions(production_id) on delete cascade,
	file_url varchar(500) not null,
    file_type ENUM("VIDEO", "IMAGE", "PDF", "AUDIO")
);

create table Followers(
	follower_id int auto_increment not null primary key,
    FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    FK_creator_id int not null,
    foreign key (FK_creator_id) references Creators(creator_id) on delete cascade,
	created_at timestamp default current_timestamp,
    unique(FK_user_id, FK_creator_id)
);

create table Playlists(
	playlist_id int auto_increment not null primary key,
    FK_user_id int not null,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    title varchar(100) not null,
    created_at timestamp default current_timestamp, 
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table PlaylistItems(
	item_id int auto_increment not null primary key,
    FK_playlist_id int not null,
    foreign key (FK_playlist_id) references Playlists(playlist_id) on delete cascade,
    FK_production_id int not null,
    foreign key (FK_production_id) references Productions(production_id) on delete cascade,
    created_at timestamp default current_timestamp,
    unique(FK_playlist_id, FK_production_id)
);

create table Posts(
	post_id int auto_increment not null primary key,
    FK_creator_id int not null,
    foreign key (FK_creator_id) references Creators(creator_id) on delete cascade,
    title varchar(100) not null,
    description text,
	created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

create table PostMedia(
	media_id int auto_increment not null primary key,
    FK_post_id int not null,
    foreign key (FK_post_id) references Posts(post_id) on delete cascade,
    media_url varchar(500),
    media_type ENUM("VIDEO", "IMAGE", "PDF", "AUDIO")
);

create table ProductionLikes(
	production_like_id int auto_increment not null primary key,
    FK_user_id int not null,
    FK_production_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    foreign key (FK_production_id) references Productions(production_id) on delete cascade,
    unique(FK_user_id, FK_production_id)
);

create table PostLikes(
	post_like_id int auto_increment not null primary key,
    FK_user_id int not null,
    FK_post_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    foreign key (FK_post_id) references Posts(post_id)on delete cascade,
    unique(FK_user_id, FK_post_id)
);

create table ProductionComments(
	production_comment_id int auto_increment not null primary key,
    content text not null,
    FK_user_id int not null,
    FK_production_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    foreign key (FK_production_id) references Productions(production_id) on delete cascade
);

create table PostComments(
	post_comment_id int auto_increment not null primary key,
    content text not null,
    FK_user_id int not null,
    FK_post_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    foreign key (FK_post_id) references Posts(post_id) on delete cascade
);

create table ProductionFavorites(
	production_favorite_id int auto_increment not null primary key,
    FK_user_id int not null,
    FK_production_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    foreign key (FK_production_id) references Productions(production_id) on delete cascade,
    unique(FK_user_id, FK_production_id)
);

create table PostFavorites(
	post_favorite_id int auto_increment not null primary key,
    FK_user_id int not null,
    FK_post_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (FK_user_id) references Users(user_id) on delete cascade,
    foreign key (FK_post_id) references Posts(post_id) on delete cascade,
    unique(FK_user_id, FK_post_id)
);

create table Payments(
	payment_id int auto_increment not null primary key,
    amount decimal(10,2) not null,
    FK_user_id int,
    foreign key (FK_user_id) references Users(user_id) on delete set null,
    status ENUM("SUCCESS","PENDING", "FAILED") default "PENDING" not null,
    created_at timestamp default current_timestamp
);

create table Tips(
	tip_id int auto_increment not null primary key,
    amount decimal(10,2) not null,
    FK_creator_id int not null,
    foreign key (FK_creator_id) references Creators(creator_id) on delete cascade,
    FK_payment_id int not null,
    foreign key (FK_payment_id) references Payments(payment_id) on delete cascade,
	created_at timestamp default current_timestamp
);


