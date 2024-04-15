-- create schema proyecto;

-- use proyecto;

-- CREATE TABLE usuarios (

-- /*  Columna 	        Tipo de dato 	    Restricciones */

--     id 			        INT 		        UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     mail 		        VARCHAR(250) 	    NOT NULL,
--     contrasenia 	    VARCHAR(1000) 	    NOT NULL,
--     fecha 	            DATE 		        NOT NULL,
--     dni 	            INT 		        NOT NULL, UNIQUE,
--     fotoPerfil 	        VARCHAR(250) 	    NOT NULL,
--     createdAt 		    TIMESTAMP 	        DEFAULT CURRENT_TIMESTAMP ,
--     updatedAt 		    TIMESTAMP 	        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     deletedAt		    TIMESTAMP           NULL ON UPDATE CURRENT_TIMESTAMP, 
-- );

-- CREATE TABLE productos (

-- /*  Columna 	        Tipo de dato 	    Restricciones */
 
--     id 			        INT 		        UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     id_usuario          INT			        UNSIGNED,
--     imagen              VARCHAR(250) 	    NOT NULL,
--     nombre              VARCHAR(250) 	    NOT NULL,
--     descripcion         VARCHAR(350) 	    NOT NULL,
--     createdAt 		    TIMESTAMP 	        DEFAULT CURRENT_TIMESTAMP ,
--     updatedAt 	    	TIMESTAMP 	        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     deletedAt	    	TIMESTAMP           NULL ON UPDATE CURRENT_TIMESTAMP, 

--     FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
-- );

-- CREATE TABLE comentarios (

-- /*  Columna         Tipo de dato 	    Restricciones */

--     id 			    INT 		        UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     id_producto		INT		            UNSIGNED,
--     id_usuario		INT		            UNSIGNED,
--     texto 		    VARCHAR(500) 	    NOT NULL,
--     createdAt 		TIMESTAMP 	        DEFAULT CURRENT_TIMESTAMP ,
--     updatedAt 		TIMESTAMP 	        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     deletedAt		TIMESTAMP           NULL ON UPDATE CURRENT_TIMESTAMP, 

--     FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
--     FOREIGN KEY (id_producto) REFERENCES productos(id),

-- );


-- INSERT INTO usuarios (id,       mail,                    contrasenia,  fecha,         dni,         fotoPerfil,           createdAt,     updatedAt,      deletedAt)
-- VALUES               (default,  'jdoe@example.com',      '123456',     '2024/10/20',  '46452824',  'images/users/6.png', );
--                      (default,  'msmith@example.com',    '123456',     '2023/10/20',  '45452824',  'images/users/7.png', );
--                      (default,  'ajohnson@example.com',  '123456',     '2022/10/20',  '44452824',  'images/users/8.png', );
--                      (default,  'emiller@example.com',   '123456',     '2021/10/20',  '43452824',  'images/users/9.png', );
--                      (default,  'dwilliams@example.com', '123456',     '2020/10/20',  '42452824',  'images/users/10.png', );

-- INSERT INTO productos (id,      id_usuario, imagen,                         nombre,                             descripcion,                                                                                                                                            createdAt, updatedAt, deletedAt)
-- VALUES                (default, 1,          'images/products/sneakers1.png', 'Zapatillas UltraRun - Nike',       'Zapatillas diseñadas para máxima comodidad y rendimiento durante la carrera. Tecnología avanzada de amortiguación.', );
--                       (default, 1,          'images/products/sneakers2.png', 'Max Cushion - Adidas',             'Ideal para corredores que buscan una experiencia superior en amortiguación y soporte.', );
--                       (default, 2,          'images/products/sneakers3.png', 'Street Style - Puma',              'Combina comodidad y estilo urbano, perfectas para el día a día en la ciudad.', );
--                       (default, 2,          'images/products/sneakers4.png', 'Classic Retro - New Balance',      'Revive el estilo clásico con estas zapatillas, combinando comodidad y diseño retro.', );
--                       (default, 3,          'images/products/sneakers5.png', 'Trail Master - Salomon',            'Zapatillas robustas para senderismo y terrenos difíciles, ofrecen excelente tracción y protección.', );
--                       (default, 3,          'images/products/sneakers6.png', 'Gym King - Under Armour',           'Optimizadas para el gimnasio, estas zapatillas proporcionan la estabilidad y el apoyo necesarios para levantamiento de pesas.', );
--                       (default, 4,          'images/products/sneakers7.png', 'Soccer Pro - Adidas',               'Diseñadas para el futbolista moderno, ofrecen un control de balón excepcional y una sensación ligera.', );
--                       (default, 4,          'images/products/sneakers8.png', 'Basketball Elite - Nike',           'Maximiza tu rendimiento en la cancha con estas zapatillas diseñadas para la agilidad y el soporte.', );
--                       (default, 5,          'images/products/sneakers9.png', 'Casual Comfort - Skechers',         'Zapatillas casuales con tecnología de memoria para un ajuste cómodo todo el día.', );
--                       (default, 5,          'images/products/sneakers10.png', 'Skate Sharp - Vans',                'Diseñadas específicamente para el skateboarding, estas zapatillas ofrecen durabilidad y agarre superior.', );


-- INSERT INTO comentarios (id, id_producto, id_usuario, texto, createdAt, updatedAt, deletedAt)
-- VALUES (default, 1, 1, '¡Estas zapatillas Nike son super cómodas y ligeras, perfectas para correr! Me encanta el diseño moderno. 🏃‍♂️', );
--        (default, 1, 2, '¡Increíble! Las zapatillas Nike Air Max tienen una amortiguación perfecta. Son mis nuevas favoritas para el gimnasio. 🏋️‍♀️', );
--        (default, 1, 3, '¡Las Nike Air Max no solo son estilosas sino también muy funcionales! Excelente soporte para largas caminatas. 🚶‍♂️', );
       
--        (default, 2, 4, '¡Adoro estas Adidas Ultraboost! Se sienten como una nube y tienen un soporte increíble. Son ideales para maratones. 🏅', );
--        (default, 2, 5, 'Las Adidas Ultraboost transformaron mi experiencia al correr. No hay retorno después de probar estas. 😍', );
--        (default, 2, 1, '¡Estas Adidas son lo máximo! La tecnología de la suela hace que cada paso sea más cómodo que el anterior. ✨', );
       
--        (default, 3, 2, '¡Las Puma RS-X son las zapatillas más cómodas que he tenido! Perfectas para el uso diario. 🌟', );
--        (default, 3, 3, 'Realmente impresionado con el estilo y la comodidad de las Puma RS-X. Se han convertido en mis zapatillas favoritas. 🎉', );
--        (default, 3, 4, '¡Puma nunca decepciona! Estas RS-X son tanto estilosas como funcionales. ¡Las recomiendo! 🏆', );
       
--        (default, 4, 5, 'Las zapatillas Vans Old Skool son clásicas. Perfectas para el skate y también para el estilo casual. 👟', );
--        (default, 4, 1, '¡Amo cómo las Vans Old Skool combinan con todo! Son muy duraderas y cómodas para caminar todo el día. 🚶‍♀️', );
--        (default, 4, 2, 'Vans Old Skool, un icono de la moda urbana. ¡Combinan bien con jeans o shorts y son super cómodas! 🌆', );
       
--        (default, 5, 3, '¡Las zapatillas Converse Chuck Taylor son imprescindibles! Son un clásico que nunca pasa de moda. 🌟', );
--        (default, 5, 4, 'Converse Chuck Taylor, perfectas para cualquier ocasión. Desde conciertos hasta salidas casuales. 🎶', );
--        (default, 5, 5, 'Me encanta la versatilidad de las Converse. Son cómodas, estilosas y vienen en muchos colores. 🎨', );
       
--        (default, 6, 1, 'Las zapatillas Reebok Classic son perfectas para un look retro. ¡Super cómodas y estilosas! ✨', );
--        (default, 6, 2, '¡Reebok Classic lleva el estilo retro a otro nivel! Perfectas para el día a día. 🏃‍♀️', );
--        (default, 6, 3, 'Amo la calidad y el diseño de las Reebok Classic. Son mis zapatillas go-to para cualquier actividad. 🏅', );
       
--        (default, 7, 4, 'Las New Balance 574 son increíblemente cómodas. Excelente para largas caminatas o estar de pie todo el día. 👟', );
--        (default, 7, 5, '¡Estas New Balance son las zapatillas más versátiles que he tenido! Buen soporte y estilo clásico. 😊', );
--        (default, 7, 1, 'New Balance 574, un verdadero clásico. Comodidad y estilo que dura todo el día. 💖', );
       
--        (default, 8, 2, '¡Las zapatillas Skechers Go Walk son como caminar sobre nubes! Perfectas para viajar o para el día a día. 🌍', );
--        (default, 8, 3, 'Estas Skechers son las mejores para el trabajo. Me ayudan a mantenerme cómodo durante largas horas. ✨', );
--        (default, 8, 4, '¡Skechers Go Walk ofrece comodidad sin sacrificar el estilo! Son mis nuevas favoritas para caminar. 🚶‍♂️', );
    
