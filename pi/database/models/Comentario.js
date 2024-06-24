module.exports = (sequelize, dataTypes) =>{
let alias = "Comentario"

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        texto:{
            type: dataTypes.STRING
        },
        usuarioId:{
            type: dataTypes.INTEGER
        },
        productoId:{
            type: dataTypes.INTEGER
        },
        

    }

    let config ={
        tableName: "comentarios",
        timestamps: true,
        underscored: false,

    }; 
    
    let Comentario = sequelize.define(alias, cols, config); //estos tres son parametros
    Comentario.associate = function (models) {
      Comentario.belongsTo(models.Usuario, {
        as: "usuario",
        foreignKey: "usuarioId",
      });
      Comentario.belongsTo(models.Producto, {
        as: "producto",
        foreignKey: "productoId",
      });
    };
    
    return Comentario;

};
