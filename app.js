var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
cors = require("cors"),
middleware = require("./middleware"),
mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/recaudoexpress", 
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	function(err, res){
		if(err) throw err;
		console.log("Conectado a la BD");
	}
);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(methodOverride());
app.use(cors());
app.set('port', 3000);


//cargar controladores
var models = require("./models/usuario")(app, mongoose);
var UsuarioCtrl = require('./controllers/usuarios');
var authCtrl = require('./controllers/auth');


var router = express.Router();
router.get('/', function(req, res){
	return res.status(200)
			.json({
				mensaje: "El servidor funciona correctamente"
			});
});

router.post('/auth/singup', authCtrl.emailSignup);
//router.post('/auth/login', authCtrl.emailLogin);
router.post('/auth/generarTotp', authCtrl.generarTotp);
router.post('/auth/validarTotp', authCtrl.validarTotp);

router.get('/private', middleware.ensureAuthenticated);

var usuarios = express.Router();

usuarios.route('/usuarios')
	.get(UsuarioCtrl.findAllUsuarios);

usuarios.route('/usuarios/:email')
	.get(UsuarioCtrl.findByEmail);

app.use('/', router);
app.use('/api', usuarios);

app.listen(3000, function(){
	console.log("Corriendo en el puerto 3000");
});
