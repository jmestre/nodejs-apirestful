var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

exports.findAllUsuarios = function(req, res){
	Usuario.find( function(err, usuarios){
		if(err) return res.send(500, err.message)
		
		console.log('GET /usuarios');
		return res.status(200).jsonp(usuarios);
	});
};

exports.findByEmail = function(req, res){
	Usuario.findByEmail(req.paramas.email, function(err, usuario){
		if(err) return res.send(500, err.message);

		console.log("GET /usuario/" + req.params.email);
		return res.status(200).jsonp(usuario);
	});
};

