DROP SCHEMA IF exists pi;
CREATE SCHEMA pi;
USE pi ;


CREATE TABLE usuarios(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(250) NOT NULL,
    usuario VARCHAR(250) NOT NULL,
	contrasenia VARCHAR(250) NOT NULL,
	fecha date NOT NULL,
	dni int NOT NULL, 
	fotoPerfil VARCHAR(250),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL
);




CREATE TABLE productos(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	imagen_producto VARCHAR(250)NOT NULL,
	nombre_producto VARCHAR(250)NOT NULL,
	descripcion_producto VARCHAR(350)NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
    usuario_id INT UNSIGNED,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);



CREATE TABLE comentarios(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	texto VARCHAR(500) NOT NULL, 
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deletedAt TIMESTAMP NULL,
    usuario_id INT UNSIGNED,
    productos_id INT UNSIGNED,


	FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
	FOREIGN KEY (productos_id) REFERENCES productos(id)
);

INSERT INTO usuarios (id,       email,                    contraseña,  fecha,         dni,        foto_perfil,           createdAt,          updatedAt,           deletedAt)
VALUES               
					 (  'jdoe@example.com',      '123456',     '2024/10/20',  '46452824',  '/images/users/profile.jpeg', current_timestamp(), current_timestamp(), null ),
					 (  'msmith@example.com',    '123456',     '2023/10/20',  '45452824',  '/images/users/profile.jpeg', current_timestamp(), current_timestamp(), null ),
                     (  'ajohnson@example.com',  '123456',     '2022/10/20',  '44452824',  '/images/users/profile.jpeg', current_timestamp(), current_timestamp(), null ),
                     ( 'emiller@example.com',   '123456',     '2021/10/20',  '43452824',  '/images/users/profile.jpeg', current_timestamp(), current_timestamp(), null ),
                     (  'dwilliams@example.com', '123456',     '2020/10/20',  '42452824',  '/images/users/profile.jpeg', current_timestamp(), current_timestamp(), null );

INSERT INTO productos (id,       usuario_id, imagen_producto,                         nombre_producto,                             descripcion_producto,                                                                                                             createdAt,      updatedAt,          deletedAt)
VALUES                ( 1,          '/images/products/default-image.png', 'Zapatillas UltraRun - Nike',       'Zapatillas diseñadas para máxima comodidad y rendimiento durante la carrera. Tecnología avanzada de amortiguación.', current_timestamp(), current_timestamp(), null ),
                      ( 1,          '/images/products/default-image.png', 'Max Cushion - Adidas',             'Ideal para corredores que buscan una experiencia superior en amortiguación y soporte.', current_timestamp(), current_timestamp(), null ),
                      ( 2,          '/images/products/default-image.png', 'Street Style - Puma',              'Combina comodidad y estilo urbano, perfectas para el día a día en la ciudad.', current_timestamp(), current_timestamp(), null ),
                      ( 2,          '/images/products/default-image.png', 'Classic Retro - New Balance',      'Revive el estilo clásico con estas zapatillas, combinando comodidad y diseño retro.', current_timestamp(), current_timestamp(), null ),
                      (3,          '/images/products/default-image.png', 'Trail Master - Salomon',            'Zapatillas robustas para senderismo y terrenos difíciles, ofrecen excelente tracción y protección.', current_timestamp(), current_timestamp(), null ),
                      ( 3,          '/images/products/default-image.png', 'Gym King - Under Armour',           'Optimizadas para el gimnasio, estas zapatillas proporcionan la estabilidad y el apoyo necesarios para levantamiento de pesas.', current_timestamp(), current_timestamp(), null ),
                      ( 4,          '/images/products/default-image.png', 'Soccer Pro - Adidas',               'Diseñadas para el futbolista moderno, ofrecen un control de balón excepcional y una sensación ligera.', current_timestamp(), current_timestamp(), null ),
                      ( 4,          '/images/products/default-image.png', 'Basketball Elite - Nike',           'Maximiza tu rendimiento en la cancha con estas zapatillas diseñadas para la agilidad y el soporte.', current_timestamp(), current_timestamp(), null ),
                      (, 5,          '/images/products/default-image.png', 'Casual Comfort - Skechers',         'Zapatillas casuales con tecnología de memoria para un ajuste cómodo todo el día.', current_timestamp(), current_timestamp(), null ),
                      ( 5,          '/images/products/default-image.png', 'Skate Sharp - Vans',                'Diseñadas específicamente para el skateboarding, estas zapatillas ofrecen durabilidad y agarre superior.', current_timestamp(), current_timestamp(), null );


INSERT INTO comentarios (id, productos_id, usuario_id, texto_comentario, createdAt, updatedAt, deletedAt)
VALUES ( 1, 1, '¡Estas zapatillas Nike son super cómodas y ligeras, perfectas para correr! Me encanta el diseño moderno.', current_timestamp(), current_timestamp(), null ),
       ( 1, 2, '¡Increíble! Las zapatillas Nike Air Max tienen una amortiguación perfecta. Son mis nuevas favoritas para el gimnasio.', current_timestamp(), current_timestamp(), null ),
       ( 1, 3, '¡Las Nike Air Max no solo son estilosas sino también muy funcionales! Excelente soporte para largas caminatas.‍️', current_timestamp(), current_timestamp(), null ),
       
       ( 2, 4, '¡Adoro estas Adidas Ultraboost! Se sienten como una nube y tienen un soporte increíble. Son ideales para maratones.', current_timestamp(), current_timestamp(), null ),
       (, 2, 5, 'Las Adidas Ultraboost transformaron mi experiencia al correr. No hay retorno después de probar estas.', current_timestamp(), current_timestamp(), null ),
       (, 2, 1, '¡Estas Adidas son lo máximo! La tecnología de la suela hace que cada paso sea más cómodo que el anterior.', current_timestamp(), current_timestamp(), null ),
       
       ( 3, 2, '¡Las Puma RS-X son las zapatillas más cómodas que he tenido! Perfectas para el uso diario.', current_timestamp(), current_timestamp(), null ),
       ( 3, 3, 'Realmente impresionado con el estilo y la comodidad de las Puma RS-X. Se han convertido en mis zapatillas favoritas.', current_timestamp(), current_timestamp(), null ),
       ( 3, 4, '¡Puma nunca decepciona! Estas RS-X son tanto estilosas como funcionales. ¡Las recomiendo!', current_timestamp(), current_timestamp(), null ),
       
       ( 4, 5, 'Las zapatillas Vans Old Skool son clásicas. Perfectas para el skate y también para el estilo casual.', current_timestamp(), current_timestamp(), null ),
       ( 4, 1, '¡Amo cómo las Vans Old Skool combinan con todo! Son muy duraderas y cómodas para caminar todo el día.‍️', current_timestamp(), current_timestamp(), null ),
       (, 4, 2, 'Vans Old Skool, un icono de la moda urbana. ¡Combinan bien con jeans o shorts y son super cómodas!', current_timestamp(), current_timestamp(), null ),
       
       ( 5, 3, '¡Las zapatillas Converse Chuck Taylor son imprescindibles! Son un clásico que nunca pasa de moda.', current_timestamp(), current_timestamp(), null ),
       ( 5, 4, 'Converse Chuck Taylor, perfectas para cualquier ocasión. Desde conciertos hasta salidas casuales.', current_timestamp(), current_timestamp(), null ),
       ( 5, 5, 'Me encanta la versatilidad de las Converse. Son cómodas, estilosas y vienen en muchos colores.', current_timestamp(), current_timestamp(), null ),
       
       (6, 1, 'Las zapatillas Reebok Classic son perfectas para un look retro. ¡Super cómodas y estilosas!', current_timestamp(), current_timestamp(), null ),
       ( 6, 2, '¡Reebok Classic lleva el estilo retro a otro nivel! Perfectas para el día a día.', current_timestamp(), current_timestamp(), null ),
       ( 6, 3, 'Amo la calidad y el diseño de las Reebok Classic. Son mis zapatillas go-to para cualquier actividad.', current_timestamp(), current_timestamp(), null ),
       
       ( 7, 4, 'Las New Balance 574 son increíblemente cómodas. Excelente para largas caminatas o estar de pie todo el día.', current_timestamp(), current_timestamp(), null ),
       ( 7, 5, '¡Estas New Balance son las zapatillas más versátiles que he tenido! Buen soporte y estilo clásico.', current_timestamp(), current_timestamp(), null ),
       ( 7, 1, 'New Balance 574, un verdadero clásico. Comodidad y estilo que dura todo el día.', current_timestamp(), current_timestamp(), null ),
       
       ( 8, 2, '¡Las zapatillas Skechers Go Walk son como caminar sobre nubes! Perfectas para viajar o para el día a día.', current_timestamp(), current_timestamp(), null ),
       ( 8, 3, 'Estas Skechers son las mejores para el trabajo. Me ayudan a mantenerme cómodo durante largas horas.', current_timestamp(), current_timestamp(), null ),
       ( 8, 4, '¡Skechers Go Walk ofrece comodidad sin sacrificar el estilo! Son mis nuevas favoritas para caminar.‍️', current_timestamp(), current_timestamp(), null );
