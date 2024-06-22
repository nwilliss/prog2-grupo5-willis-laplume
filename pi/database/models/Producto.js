module.exports = (sequelize, dataTypes) =>{
  let alias = "Producto";

let cols = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: dataTypes.INTEGER,
  },
  imagen: {
    type: dataTypes.STRING,
  },
  nombre: {
    type: dataTypes.STRING,
  },
  descripcion: {
    type: dataTypes.STRING,
  },
  usuarioId: {
    type: dataTypes.INTEGER,
  },
};

let config = {
  tableName: "productos",
  timestamps: true,
  underscored: true,
};


let Producto = sequelize.define(alias, cols, config); //estos tres son parametros

  Producto.associate = function (models) {
    Producto.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "usuarioId",
    }),
    Producto.hasMany(models.Comentario, {
      as: "comentarios",
      foreignKey: "productoId",
    })
  };

return Producto;
};
