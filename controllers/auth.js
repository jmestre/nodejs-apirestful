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
			return res.status(200)
			.send({token: service.createToken(user)});
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

exports.generarTotp = function(req, res) {
	Usuario.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		if (err) {
			return res.status(500)
			.json({
				err: err,
				ok: false
			});
		}

		if (service.validateToken(req, res, user)) {
			var totp = "";
			if(user.telefonoValidacion) {
				if(user.telefonoValidacion === req.body.celular) {
					//se genera totp
					totp = "283749";
				}
				else {
					return res.status(500)
					.json({
						err: "Datos no validos para autenticacion",
						ok: false
					});
				}
			}
			else {
				user.telefonoValidacion = req.body.celular;
				user.save();
				totp = "283749";
			}
			
			return res.status(200)
			.json({
				totp: totp,
				ok: true
			});
		}
		else {
			return res.status(401)
			.json({
				mensaje: "Token no valido",
				ok: false
			})
		}
	});
}

exports.validarTotp = function(req, res) {
	Usuario.findOne({email: req.body.email.toLowerCase(), telefonoValidacion: req.body.email.celular}, function(err, user) {
		if(err) {
			return res.status(500).json({
				err: err,
				ok: false
			});
		}
		
		if (!service.validateToken(req, res, user)) {
			return res.status(401)
			.json({
				mensaje: "Token no valido",
				ok: false
			})
		}

		if(!user) {
			return res.status(404).json({
				err: "Error validando los datos",
				ok: false});
		}
		
		//se valida el totp enviado con el generado en el sistema
		var totpSistema = "283749";
		if(req.body.totp === totpSistema) {
			return res.status(200)
			.json({
				user: user,
				ok: true
			});
		}
		else {
			return res.status(401)
			.json({
				mensaje: "Codigo invalido.",
				ok: true
			});
		}
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