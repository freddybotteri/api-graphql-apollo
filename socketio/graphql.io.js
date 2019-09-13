"use strict"
const axios = require('axios');
const API_URL = 'http://localhost:4000/graphql';




/*
========================================================
     ADMIN conected 
*/
const graph = { insertQRcode: async (id,data)=>{
	try{
		return await axios.post(API_URL, {
		    	query: `
					mutation createQR($id:Int,$input: QRInput) {
						createQR(id:$id,input: $input) {
						  cod_vuuid
						}
					}
				`,
				variables: {id:id,input:data},
	  });
	}catch(err){
		console.log(err)
		return err;
	}
	
}


}
module.exports =  graph;


