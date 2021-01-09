exports = module.exports = function(app, mongoose){

	var usuarioSchema = new mongoose.Schema({
		email: { type: String, unique : true, required : true },
		clave: { type: String },
		created: { type: Date, default: Date.now}
	});

	module.exports = mongoose.model('Usuario', usuarioSchema);
};
