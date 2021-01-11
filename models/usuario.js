exports = module.exports = function(app, mongoose){

	var usuarioSchema = new mongoose.Schema({
		email: { type: String, unique : true, required : true },
		clave: { type: String, required : true },
		nombre: {type: String},
		apellido: {type: String},
		direccion: {type: String},
		telefonos: {type: Array},
		celularValidacion: {type: String},
		identificacion: {type: String},
		pais: {type: String},
		ciudad: {type: String},
		fechaNacimiento: {type: Date},
		created: { type: Date, default: Date.now}
	});

	module.exports = mongoose.model('Usuario', usuarioSchema);
};
