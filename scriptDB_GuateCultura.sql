drop database if exists GuateCultura_in5cm;
create database GuateCultura_in5cm;
use GuateCultura_in5cm;

create table Users(
	user_id int auto_increment primary key not null,
    username varchar(100) not null unique,
    email varchar(100) not null unique,
    password text not null,
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
    file_type ENUM("VIDEO", "IMAGE", "PDF", "AUDIO") not null
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
    media_url varchar(500) not null,
    media_type ENUM("VIDEO", "IMAGE", "PDF", "AUDIO") not null
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

-- DATOS DE PRUEBRA
insert into Users (username, email, password, first_name, last_name, rol) values
('maria_kaqchikel', 'maria.tuyuc@gmail.com', 'MariaT2024!', 'María', 'Tuyuc', 'CREATOR'),
('carlos_mendoza_gt', 'carlos.mendoza@outlook.com', 'Chapin1985#', 'Carlos', 'Mendoza', 'CREATOR'),
('admin_guatecultura', 'admin@guatecultura.gt', 'AdminGC_2023*', 'Ana Lucía', 'Ramírez', 'ADMIN'),
('diego_marimba', 'diego.xicay@yahoo.com', 'Marimba456', 'Diego', 'Xicay', 'CREATOR'),
('sofia_reads', 'sofia.morales88@gmail.com', 'LibrosYcafe88', 'Sofía', 'Morales', 'CREATOR'),
('pedro_cineasta', 'pedro.cinephile@protonmail.com', 'Cine_Icaro23', 'Pedro Antonio', 'Gutiérrez', 'CREATOR'),
('lucia_arte', 'lucia.godoy@icloud.com', 'IxchelMaya7', 'Lucía', 'Godoy', 'CREATOR'),
('juanjo_poeta', 'juanjo.escritor@gmail.com', 'VersosDelFuego22', 'Juan José', 'Aguilar', 'CREATOR'),
('andrea_gt', 'andrea.ovalle@hotmail.com', 'LluviaCoban99', 'Andrea', 'Ovalle', 'CREATOR'),
('roberto_folklore', 'roberto.chavez@gmail.com', 'FolkloreGT_10', 'Roberto', 'Chávez', 'CREATOR'),
('fernando_pelaez', 'fersan.pelaez@gmail.com', 'FernandoPass01', 'Fernando', 'Peláez', 'USER'),
('valeria_marin', 'vale.marin@outlook.com', 'ValeSegura25', 'Valeria', 'Marín', 'USER');

insert into Creators (FK_user_id, bio, profile_img) values
(1, 'Tejedora y compositora kaqchikel de Sololá. Mi música fusiona sonidos ancestrales mayas con arreglos contemporáneos. Rescato canciones que mi abuela me enseñó en la lengua de nuestros abuelos.', 'https://cdn.guatecultura.gt/profiles/maria_kaqchikel_2024.jpg'),
(4, 'Marimbista de tercera generación, originario de San Marcos. Toco marimba de arco desde los 8 años. Actualmente formo parte del conjunto Ecos del Altiplano.', 'https://cdn.guatecultura.gt/profiles/diego_marimba.png'),
(6, 'Cineasta independiente enfocado en documentales sobre pueblos originarios. Ganador del Festival Ícaro 2023 con Voces del Ixil.', 'https://cdn.guatecultura.gt/profiles/pedro_cineasta_bw.jpg'),
(8, 'Poeta chapín. Autor de Versos del Volcán (2022) y Cartas a Xelajú (2024). Miembro de la Asociación de Escritores de Guatemala.', 'https://cdn.guatecultura.gt/profiles/juanjo_escritor.jpg'),
(10, 'Investigador y divulgador del folklore guatemalteco. Recolecto sones, corridos y leyendas de todos los rincones del país.', 'https://cdn.guatecultura.gt/profiles/roberto_folk.jpg'),
(2, 'Fotógrafo aficionado con pasión por documentar mercados y ferias patronales. Comparto pequeños ensayos audiovisuales.', NULL),
(5, 'Escribo microcuentos ambientados en la Antigua Guatemala. Amante del café, los libros viejos y las tardes lluviosas.', 'https://cdn.guatecultura.gt/profiles/sofia_letras.jpg'),
(7, 'Ilustradora digital. Rescato personajes de la mitología maya y los reinterpreto en clave moderna.', 'https://cdn.guatecultura.gt/profiles/lucia_ilustra.png'),
(9, 'Cantautora indie de Cobán. Mis canciones hablan de la nostalgia, la lluvia y el amor imposible.', 'https://cdn.guatecultura.gt/profiles/andrea_musica.jpg'),
(3, 'Cuenta oficial de la administración de GuateCultura. Comparto contenido curado, novedades y anuncios de la plataforma.', 'https://cdn.guatecultura.gt/profiles/admin_default.png');

insert into Productions (FK_creator_id, title, description, category, visibility) values
(1, 'Canto a la Milpa', 'Canción tradicional kaqchikel interpretada con tzu y voz. Homenaje al ciclo del maíz.', 'MUSIC', 'PUBLIC'),
(2, 'Son Chapín No. 3 - Xela', 'Composición original para marimba doble inspirada en las calles de Quetzaltenango.', 'MUSIC', 'PUBLIC'),
(3, 'Voces del Ixil (Documental completo)', 'Documental de 45 minutos sobre las mujeres tejedoras de Nebaj y su resistencia cultural.', 'CINEMA', 'PUBLIC'),
(4, 'Versos del Volcán - Capítulo I', 'Primer capítulo de mi poemario dedicado al volcán de Fuego. Incluye 7 poemas inéditos.', 'LITERATURE', 'PUBLIC'),
(5, 'La leyenda del Sombrerón (Versión Cobán)', 'Grabación de audio con la versión q eqchi de la leyenda, contada por Don Aurelio Coc.', 'LITERATURE', 'PUBLIC'),
(7, 'Microcuentos de la 5a Avenida', 'Colección de 12 microcuentos ambientados en la Antigua. Lectura de 15 minutos.', 'LITERATURE', 'DRAFT'),
(9, 'Lluvia en Cobán (EP)', 'EP de 5 canciones grabadas en vivo desde mi cuarto. Guitarra acústica y voz.', 'MUSIC', 'PUBLIC'),
(3, 'Cortometraje: El último atol', 'Cortometraje de ficción de 12 minutos sobre un vendedor de atol shuco en la zona 1.', 'CINEMA', 'PRIVATE'),
(1, 'Ru x Ya (Alma del Agua)', 'Álbum conceptual de 8 pistas dedicado al lago de Atitlán y sus leyendas.', 'MUSIC', 'PUBLIC'),
(4, 'Cartas a Xelajú (Fragmento)', 'Adelanto exclusivo del primer capítulo de mi nueva novela epistolar.', 'LITERATURE', 'PUBLIC');

insert into ProductionFiles (FK_production_id, file_url, file_type) values
(1, 'https://cdn.guatecultura.gt/audio/canto_milpa.mp3', 'AUDIO'),
(1, 'https://cdn.guatecultura.gt/images/portada_milpa.jpg', 'IMAGE'),
(2, 'https://cdn.guatecultura.gt/audio/son_xela.wav', 'AUDIO'),
(3, 'https://cdn.guatecultura.gt/video/voces_ixil_completo.mp4', 'VIDEO'),
(4, 'https://cdn.guatecultura.gt/docs/versos_volcan_cap1.pdf', 'PDF'),
(5, 'https://cdn.guatecultura.gt/audio/sombreron_qeqchi.mp3', 'AUDIO'),
(7, 'https://cdn.guatecultura.gt/audio/lluvia_coban_ep.mp3', 'AUDIO'),
(8, 'https://cdn.guatecultura.gt/video/ultimo_atol_HD.mp4', 'VIDEO'),
(9, 'https://cdn.guatecultura.gt/audio/rux_ya_album.zip', 'AUDIO'),
(10, 'https://cdn.guatecultura.gt/docs/cartas_xelaju_preview.pdf', 'PDF');

insert into Followers (FK_user_id, FK_creator_id) values
(2, 1),
(2, 2),
(5, 4),
(5, 1),
(7, 1),
(7, 6),
(9, 3),
(9, 2),
(2, 5),
(11, 3),
(11, 1),
(12, 4),
(12, 9);

insert into Playlists (FK_user_id, title) values
(2, 'Marimba para trabajar'),
(5, 'Lecturas de café'),
(7, 'Documentales chapines imperdibles'),
(9, 'Sonidos de la lluvia'),
(2, 'Leyendas para dormir'),
(5, 'Poesía guatemalteca contemporánea'),
(7, 'Ilustraciones que inspiran'),
(9, 'Mis favoritos del mes'),
(2, 'Música ancestral maya'),
(5, 'Cortometrajes que no puedes perderte'),
(11, 'Descubriendo Guatemala'),
(12, 'Mis playlists favoritas');

insert into PlaylistItems (FK_playlist_id, FK_production_id) values
(1, 2),
(1, 9),
(2, 4),
(2, 10),
(3, 3),
(4, 7),
(5, 5),
(6, 4),
(9, 1),
(10, 8),
(11, 3),
(11, 9),
(12, 4),
(12, 7);

insert into Posts (FK_creator_id, title, description) values
(1, 'Nuevo álbum saliendo pronto', 'Familia! Estoy terminando los últimos detalles de Ru x Ya. Muy pronto lo compartiré con ustedes.'),
(2, 'Ensayo con el conjunto', 'Preparándonos para el festival de marimba en Cobán. Aquí un pequeño adelanto.'),
(3, 'Detrás de cámaras: El último atol', 'Compartiendo fotos del rodaje en la zona 1. Fueron 3 días intensos pero valió la pena.'),
(4, 'Presentación en la Filgua', 'Este sábado estaré firmando ejemplares de Cartas a Xelajú en la Filgua. Los espero.'),
(5, 'Recolectando historias en Alta Verapaz', 'Semana intensa recopilando leyendas locales. Pronto compartiré grabaciones increíbles.'),
(7, 'Café, libros y lluvia', 'El clima perfecto para escribir en la Antigua. Alguna recomendación de cafetería?'),
(8, 'Nueva ilustración: Ixchel', 'Terminé mi versión de Ixchel, diosa maya de la luna y el tejido. Espero les guste.'),
(9, 'Grabando en vivo desde mi cuarto', 'Este viernes 8pm haré una sesión en vivo. Tocaré 3 canciones nuevas.'),
(1, 'Agradecimiento eterno', 'Superamos los 500 seguidores. Gracias por apoyar la música en nuestros idiomas originarios.'),
(10, 'Bienvenidos a GuateCultura', 'Somos una plataforma dedicada a impulsar el arte y la cultura guatemalteca. Únete!');

insert into PostMedia (FK_post_id, media_url, media_type) values
(1, 'https://cdn.guatecultura.gt/posts/album_teaser.jpg', 'IMAGE'),
(2, 'https://cdn.guatecultura.gt/posts/ensayo_marimba.mp4', 'VIDEO'),
(3, 'https://cdn.guatecultura.gt/posts/bts_atol_1.jpg', 'IMAGE'),
(3, 'https://cdn.guatecultura.gt/posts/bts_atol_2.jpg', 'IMAGE'),
(4, 'https://cdn.guatecultura.gt/posts/flyer_filgua.pdf', 'PDF'),
(5, 'https://cdn.guatecultura.gt/posts/verapaz_paisaje.jpg', 'IMAGE'),
(6, 'https://cdn.guatecultura.gt/posts/cafe_antigua.jpg', 'IMAGE'),
(7, 'https://cdn.guatecultura.gt/posts/ixchel_ilustracion.png', 'IMAGE'),
(8, 'https://cdn.guatecultura.gt/posts/promo_sesion_live.mp4', 'VIDEO'),
(10, 'https://cdn.guatecultura.gt/posts/bienvenida_intro.mp4', 'VIDEO');

insert into ProductionLikes (FK_user_id, FK_production_id) values
(2, 1),
(5, 4),
(7, 9),
(9, 3),
(2, 2),
(5, 10),
(7, 1),
(9, 7),
(2, 5),
(5, 1),
(11, 3),
(11, 9),
(12, 4),
(12, 7);

insert into PostLikes (FK_user_id, FK_post_id) values
(2, 1),
(5, 4),
(7, 7),
(9, 3),
(2, 9),
(5, 6),
(7, 5),
(9, 8),
(2, 2),
(5, 1),
(11, 3),
(11, 9),
(12, 4),
(12, 8);

insert into ProductionComments (content, FK_user_id, FK_production_id) values
('Qué hermoso escuchar nuestra lengua kaqchikel en la música actual! Bendiciones.', 2, 1),
('Este documental me hizo llorar. Gracias por dar voz a estas mujeres valientes.', 5, 3),
('Los versos me transportaron directamente al Fuego. Compraré el libro completo.', 7, 4),
('La marimba nunca pasará de moda! Excelente composición, maestro.', 9, 2),
('Escuché el EP entero de un tirón. Tu voz es mágica.', 2, 7),
('Genial la versión en q eqchi, mi abuela me contaba esta leyenda igual.', 5, 5),
('Cuándo sale el álbum completo? No puedo esperar.', 7, 9),
('Me encantó el fragmento. La prosa de Aguilar sigue tan viva como siempre.', 9, 10),
('Escucharlo con audífonos es otra experiencia. Los detalles sonoros son increíbles.', 2, 9),
('Ojalá pudiera ver este cortometraje completo. Habrá estreno público?', 5, 8),
('Recién descubrí este documental y quedé impactado. Muy recomendado.', 11, 3),
('Este álbum es una joya. Lo voy a regalar a mi mamá.', 11, 9),
('Acabo de comprarlo. No veo la hora de leerlo completo.', 12, 4),
('Me encanta la lluvia y tu voz. Combinación perfecta.', 12, 7);

insert into PostComments (content, FK_user_id, FK_post_id) values
('Ya lo estamos esperando! Tu música es un tesoro.', 2, 1),
('Iré sin falta a la Filgua, ya reservé el día.', 5, 4),
('Ixchel se ve espectacular, los colores son impresionantes.', 7, 7),
('Se ve intenso el rodaje. Éxitos con el corto.', 9, 3),
('Te recomiendo Fernando Café cerca del parque central. Ambiente perfecto.', 2, 6),
('Ahí estaré conectado el viernes.', 5, 8),
('Felicidades por los 500, te los mereces por completo.', 7, 9),
('Alta Verapaz tiene tanta magia. Comparte todo lo que puedas.', 9, 5),
('La marimba en vivo es otro nivel! Suerte en el festival.', 2, 2),
('Gracias por crear este espacio para artistas guatemaltecos.', 5, 10),
('Qué buen proyecto, voy a explorar toda la plataforma.', 11, 3),
('Felicidades! Muy merecido el reconocimiento.', 11, 9),
('Gracias por compartir. Voy a leerlo ya.', 12, 4),
('Me encantó la ilustración, la guardo como wallpaper.', 12, 7);

insert into ProductionFavorites (FK_user_id, FK_production_id) values
(2, 9),
(5, 4),
(7, 3),
(9, 7),
(2, 5),
(5, 10),
(7, 1),
(9, 2),
(2, 3),
(5, 1),
(11, 3),
(11, 9),
(12, 4),
(12, 7);

insert into PostFavorites (FK_user_id, FK_post_id) values
(2, 9),
(5, 4),
(7, 7),
(9, 8),
(2, 1),
(5, 6),
(7, 5),
(9, 3),
(2, 10),
(5, 2),
(11, 3),
(11, 9),
(12, 4),
(12, 8);

insert into Payments (amount, FK_user_id, status) values
(25.00, 2, 'SUCCESS'),
(50.00, 5, 'SUCCESS'),
(10.00, 7, 'SUCCESS'),
(100.00, 9, 'PENDING'),
(15.50, 2, 'FAILED'),
(75.00, 5, 'SUCCESS'),
(30.00, 7, 'SUCCESS'),
(200.00, NULL, 'SUCCESS'),
(20.00, 9, 'SUCCESS'),
(45.00, 2, 'PENDING'),
(35.00, 11, 'SUCCESS'),
(15.00, 12, 'SUCCESS');

insert into Tips (amount, FK_creator_id, FK_payment_id) values
(25.00, 1, 1),
(50.00, 4, 2),
(10.00, 8, 3),
(100.00, 3, 4),
(75.00, 9, 6),
(30.00, 2, 7),
(200.00, 1, 8),
(20.00, 7, 9),
(45.00, 5, 10),
(35.00, 3, 11),
(15.00, 9, 12);