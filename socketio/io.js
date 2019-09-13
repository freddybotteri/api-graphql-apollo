"use strict"
const io = require('socket.io')(5000);
// const io 			= _io();

const graphqlio = require('./graphql.io');
//NAMESPACE SOCKET
const adminIO = io.of('/admin');
const clientIO = io.of('/client');

let conteo = 0;
let sokGPSs = undefined;
let acklist = {};
let _room = [];
let clientes = {}


// Manejo repocitorio Quick de Datos
let repocitorio = {
	boletas: {}
}
io.on('connection', function (socket) {
	console.log("Welcome: %s",socket.id);
	try {
		console.log("Welcome");
		if (socket.handshake.session) {
			// console.log("Se cambia el socketid en Io.js, ", socket.id);
			// socket.handshake.session.socketid = socket.id;
			// socket.handshake.session.save();
			//socket.emit("notificar", { t: 'success', h: 'SocketOk', b: "Comunication Open!" });
			// console.log('{socketId: %s, cookieId: %s}', socket.id, socket.handshake.sessionID);

			socket.emit('login_sts', !!socket.handshake.session.login)
			
			/*if (!!socket.handshake.session.login) {
				socket.emit('credentials', socket.handshake.session.user);
				addRoom(socket);
			};*/
		};
	} catch (ex) {
		console.log('todavia no hay session');
		console.log(ex);
	};
	/*
	socket.on('pingNotificar', data => {
		socket.emit('notificar', data);
	});
	socket.on('destroyLogin', (obj) => {
		socket.handshake.session.login = false;
		socket.handshake.session.user = {};
		socket.handshake.session.save();
		socket.emit('login_sts', !!socket.handshake.session.login);
	});

	socket.on('dbquery', data => {
		if (!candado(socket)) return;
		try {
			if ([
				"geoscia",
				"equipocia",
				"equipoall",
				"gpsmodelos",
				"cias",
				"modelos",
				"plugins",
				"simcardcia",
				"simcardall",
				"tipos",
				"vehiculocia",
				"vehiculoall",
				"installcia",
				"installall",
				"perfilcia",
				"perfilall",
				"userscia",
				"usersall",
				"flotillascia",
				"flotillasall",
				"operaciones",
				"icons"
			].includes(data.origen)) {
				RAM[data.origen]({
					match: socket.handshake.session.user
				}, (data.dbstrict ? data.dbstrict : 0))
					.then(res => { _then(res, data) })
					.fail(res => { _fail(res, data) })
			} else {
				socket.emit('notificar', { t: 'error', h: "DbOrigens", b: 'backendmsg.dataunknow' });
			}
		} catch (e) {
			socket.emit('notificar', {
				t: 'error',
				h: 'backedError',
				b: 'Error on query ' + data.origen + "view backed for details"
			}); // Si ocurre un error es manejado
		} finally {
			// No se que hacer
		}
	});*/

	socket.on("getLogin", x => {
		//socket.emit('credentials', socket.handshake.session.user);
		//socket.emit('permisos', socket.handshake.session.permisos);
		socket.emit('login_sts', socket.handshake.session.login);
	})

	/*socket.on('makeLogin', (obj) => {
		if (obj.user && obj.pass) {
			_SQL.getLogin(obj)
				.then((res) => {
					if (res.type == 'ok') {
						socket.handshake.session.login = true;
						socket.handshake.session.socketid = socket.id;
						socket.handshake.session.user = {};
						socket.handshake.session.user = res.datos;
						socket.handshake.session.save();
						console.log("Aqui>>", socket.handshake.session);
						socket.emit('login_sts', !!socket.handshake.session.login);
						socket.emit('credentials', socket.handshake.session.user);
						addRoom(socket);
					} else {
						console.log("########## Por alguna RAZON NO FUNCIONA");
					};
				})
				.fail((res) => {
					console.log(res);
				});
			return;
		};
		socket.emit("showToaster", { title: "Error de Autentificacion", body: "Nombre de usuario o contraseña incorrecto", type: "error" });
	});*/

	/*socket.on('reconnect', function (data) {
		// if (socket.handshake.session) {
		// 	socket.handshake.session.socketid = socket.id;
		// 	console.log("Se cambia el socketid en Io.js reconect");
		// 	console.log('reconect Id:', socket.id);
		// 	socket.handshake.session.save();
		// };
		if (socket.handshake.session.login == true) {
			addRoom(socket);
		}
	});*/

	socket.on('disconnect', function (data) {
		// Eliminar el socket del room de zona
		
		//leaveRoom(socket);

		let id = socket.handshake.sessionID;
		console.log('disconnect', socket.id);
		//console.log('console 2',io.sockets.adapter.rooms);
		//******cuando se desconecte el ultimo, entonces mandar al servicio de GPS que ya
		//******tambien se desconecte porque nadie lo esta escuchando.
	});



	/*function _then(res, data) {
		// console.log("On Ok responce",data.origen);
		if (res.type == 'ok') {
			socket.emit('dbquery', Object.assign({ origen: data.origen }, res));
		} else {
			socket.emit('LogRegistry', Object.assign({ origen: data.origen }, res));
		}
	};

	function _fail(res, data) {
		// console.log("On Fail responce",data.origen);

		socket.emit('notificar', { t: 'warning', h: res.type, b: res.msg });
		socket.emit('LogRegistry', Object.assign({ origen: data.origen }, res));
	};*/

	// algunas funciones del proceso
	function leaveRoom(_socket) {
		let rooms = io.sockets.adapter.sids[_socket.id];
	}
	let candado = (_socket) => {
		if (_socket.handshake.session.login !== true) {
			_socket.emit('notificar', { t: 'warning', h: '', b: 'Autentication is Required' });
			_socket.emit('noLogin', {});
			return false;
		}
		return true
	};
});

function addRoom(_socket, session) {
	// Adicion del socket actual a su respectibo room de zona
	if (_socket.handshake.session && _socket.handshake.session.user && _socket.handshake.session.user.cia) {
		_socket.join('cia_' + _socket.handshake.session.user.cia);
		_socket.join('session_' + _socket.handshake.sessionID);
		_socket.handshake.session.user.type && _socket.handshake.session.user.type == 'Super' && _socket.join('SUPER');
	}
}

io.addRoom = addRoom;



/*
========================================================
      APP ADMIN conected 
*/
adminIO.on('connection', function (socket) {
	try {
		//console.log('new Conection');
		socket.emit('message', "Welcome ADMIN to the Server!");


		socket.on('join', function (data) {

			try {
				socket.join('QRCODE_R');

			} catch (error) {
				console.log(error);
			}
			//console.log(io.sockets.adapter.rooms);
		});


		socket.on('[Usuario] List', function (data) {
			
			console.log('[Usuario] List',data);
		});



		socket.on('[QR] Envio code', function (data) {
			
			// console.log('[QR] Envio code',data);
			
			

			graphqlio.insertQRcode(1,data).then(({data}) => {
					if(data.errors){
						adminIO.to('QRCODE_R').emit('[QR] Recived',{sts:'fail'});

					}else{
						adminIO.to('QRCODE_R').emit('[QR] Recived',data.data.createQR.cod_vuuid);
					}
				}
			).catch(x => {
				adminIO.to('QRCODE_R').emit('[QR] Recived',{sts:'fail'});
				console.log(x);
			});
		});


		socket.on('RoomLeave', (data)=>{
			socket.leave('QRCODE_R');
		});

		
		socket.on('disconnect', function (data) {
			if (socket.id in clientes) {
				delete clientes[socket.id];
			}
		});


	} catch (ex) {
		console.log('ERROR EN SOCKET IO');
		console.log(ex);
	};
});



/*
========================================================
      APP CLIENT conected 
*/

clientIO.on('connection', function (socket) {
	try {
		//console.log('new Conection');
		socket.emit('message', "Welcome Client to the Server!");
		checkrooms();

	} catch (ex) {
		console.log('ERROR EN SOCKET IO');
		console.log(ex);
	};
});

module.exports = io;
