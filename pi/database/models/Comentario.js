let alias = "Comentario"

    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        textoComentario:{
            type: dataTypes.STRING(500)
        },
        usuarioId:{
            type: dataTypes.INTEGER
        },
        productosId:{
            type: dataTypes.INTEGER
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

    }

    let config ={
        tableName: "comentarios",
        timestamps: true,
        underscored: true,

    }

    let Comentario = sequelize.define(alias, cols, config) //estos tres son parametros 
    return Comentario 
