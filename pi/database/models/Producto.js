module.exports = (sequelize, dataTypes) =>{
  let alias = "Producto";

let cols = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: dataTypes.INTEGER,
  },
  imagenProducto: {
    type: dataTypes.STRING,
  },
  nombreProducto: {
    type: dataTypes.STRING,
  },
  descripcionProducto: {
    type: dataTypes.STRING,
  },
  createdAt: {
    type: dataTypes.DATE,
  },
  updatedAt: {
    type: dataTypes.DATE,
  },
  deletedAt: {
    type: dataTypes.DATE,
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
      foreignKey: "id_usuario",
    });
  };

return Producto;
};
