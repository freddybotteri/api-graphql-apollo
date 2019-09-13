var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var postsRouters = require('express').Router();

const axios = require('axios');
var Sequelize = require('sequelize');
 

 
/* GET home page. */
//======================================
//al momento de ingresar a la url


function isAuthenticated(req, res, next) {

  if (req.session != undefined)
      if (req.session.loguinsts)
        return next();

  res.redirect('/login');
}


postsRouters.post('/login', function(req, res) {

	req.session.loguinsts = req.body.usuario;
	req.session.login = true;
	req.session.save();

	req.app.io.emit('login_sts',{sts:'ok',data:true});
   	res.json({
	   	data:{
	   		usuario:req.body.usuario,
	   		password:req.body.password
	   	}
	});
});


/*r.post('/makeLogin', (req, res, next) => {
	let obj = req.body;
	if (obj.use_vuser && obj.use_vpass) {
		_SQL.getuser({scope:'login', match:obj}).then(data=>{
			if (data.type == 'ok') {
				if (data.datos.user[0].sts == 1) {
					if (data.datos.user[0].daysfromcreation > data.datos.user[0].validez && data.datos.user[0].validez != 0) {
						res.json({type: "fail",msg: 'backendmsg.invalidpass'});
					}else{
						req.session.login = true;
						req.session.user = data.datos.user[0];
						req.session.permisos = data.datos.permisos;
						req.app.io.in('session_' + req.session.id).emit('login_sts',!!req.session.login);
						req.app.io.in('session_' + req.session.id).emit('credentials',req.session.user);
						req.app.io.in('session_' + req.session.id).emit('permisos',req.session.permisos);
						req.session.save();
						res.json({type: "ok",msg: 'backendmsg.logOk', user:data.datos.user[0]});
					}
				}else{
					res.json({type: "fail",msg: 'backendmsg.invaliduser'});
				}
			}else{
				res.json({type: "fail",msg: 'backendmsg.bkerr1', deepmsg: data});
			}
		}).fail(error=>{
			res.json({tipo: "error", error: 'backendmsg.bkerr1', deepmsg: error});
		});
		return;
	}else{
		res.json({tipo: "error", error: 'backendmsg.requeserr'});

	};
	// socket.emit("showToaster",{title: "Error de Autentificacion", body: "Nombre de usuario o contraseña incorrecto", type: "error"} );
});
*/



/*r.get('/logout', (req, res, next) => {
	if (req.session) {
		req.session.login = false;
		delete req.session.user;
		req.session.save();
	};
	res.send("Go Back, Rigth Now!  ;-)");
});*/



postsRouters.post('/logout',isAuthenticated, function(req, res) {
	req.session.destroy();
	res.render('login');
});


router.use(postsRouters);



module.exports = router;