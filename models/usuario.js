exports = module.exports = function(app, mongoose){

	var usuarioSchema = new mongoose.Schema({
		email: { type: String },
		clave: { type: String }
	});

	module.exports = mongoose.model('Usuario', usuarioSchema);
};
