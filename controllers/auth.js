var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var service = require('../service');

exports.emailSignup = function(req, res){
	Usuario.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if (err) {
			return res.status(500)
			.json({
				err: err,
				ok: false
			});
		}

		if(user) {
			return res.status(409)
			.json({
				mensaje: "El usuario ya se encuentra registrado",
				err: err,
				ok: false
			});
		}

		var user = new Usuario({
			email: req.body.email,
			clave: req.body.clave
		});
	
		user.save(function(err){
			if (!err) {
				return res.status(200)
				.send({token: service.createToken(user)});
			}
		});
	});
}

exports.emailLogin = function(req, res){
	Usuario.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if(err) {
			return res.status(500).json({
				err: err,
				ok: false
			});
		}

		if(!user) {
			return res.status(404).json({
				err: "Usuario o contraseña incorrecta",
				ok: false});
		}

		if(req.body.clave !== user.clave) {
			return res.status(404).json({
				err: "Usuario o contraseña incorrecta",
				ok: false
			});
		}


		return res.status(200)
			.send({token: service.createToken(user)});
	});
}