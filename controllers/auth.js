var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var service = require('../service');

exports.emailSignup = function(req, res){
	var user = new Usuario({

	});

	user.save(function(err){
		return res.status(200)
			.send({token: service.createToken(user)});
	})
};

exports.emailLogin = function(req, res){
	Usuario.findOne({email: req.body.email.toLowerCase()}, function(err, user){
		return res.status(200)
			.send({token: service.createToken(user)});
	});
};