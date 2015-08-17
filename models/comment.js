//Definicion del modelo de comment con validacion 
module.exports = function(sequelize, DataTypes) {
   return sequelize.define('Comment',{ 
        texto:{
            type:DataTypes.STRING,
            validate:{ notEmpty: {msg:"-> Falta Comentario"}}
        }
    });
}

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Comment', 
		{ 	texto: {
				type: DataTypes.STRING,
				validate: { notEmpty: {msg: "-> Falata Comentario"}}
		 	},
		  	publicado: {
		  		type: DataTypes.BOOLEAN,
		  		defaultValue: false
		  	}
		}
	);
}