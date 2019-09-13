var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mantenimientoRouters = require('express').Router();

const axios = require('axios');
 

 
/* GET home page. */
//======================================
//al momento de ingresar a la url


function isAuthenticated(req, res, next) {
  //if (req.session != undefined)
      //if (req.session.loguinsts)
        //return next();

  res.redirect('/login');
}


mantenimientoRouters.get('/',isAuthenticated, function(req, res) {
   res.render('admin');
});

mantenimientoRouters.get('/perfil', function(req, res) {
   res.render('perfil');
});

mantenimientoRouters.get('/usuario', function(req, res) {
   res.render('usuario');
});

mantenimientoRouters.get('/extra',isAuthenticated, function(req, res) {
   res.render('extra');
});

mantenimientoRouters.get('/admin',isAuthenticated, function(req, res) {
	console.log(req.session);
   res.render('admin');
});

mantenimientoRouters.get('/dashboard', function(req, res) {
   res.render('dashboard');
});

mantenimientoRouters.get('/login', function(req, res) {
   res.render('login');
});



mantenimientoRouters.get('*', function(req, res,next){
  if(req.path == '/graphql'){
  	next();
  }else{
  	res.render('404');
  }	
  
});

router.use(mantenimientoRouters);



module.exports = router;