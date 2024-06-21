module.exports = (sequelize, dataTypes) =>{
let alias = "Usuario"

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        email:{
            type: dataTypes.STRING
        },
        Usuario: {
            type: dataTypes.STRING,
          },
        contrasenia: {
            type: dataTypes.STRING,
            },
        fecha:{
            type: dataTypes.DATE
        },
        dni:{
            type: dataTypes.INTEGER
        },
        fotoPerfil:{
            type: dataTypes.STRING
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt:{
            type: dataTypes.DATE
        },
        deletedAt:{
            type: dataTypes.DATE
        },
    };

    let config ={
        tableName: "usuarios",
        timestamps: true,
        underscored: false,

    }

    let Usuario = sequelize.define(alias, cols, config); //estos tres son parametros
    Usuario.associate = function (models) {
      Usuario.hasMany(models.Comentario, {
        as: "comentarios",
        foreignKey: "usuarioId",
      });
      Usuario.hasMany(models.Producto, {
        as: "productos",
        foreignKey: "usuarioId",
      });
    };

    return Usuario;
};
