const express=require('express')
const route=express.Router()

const controller=require('../controller/controller')

// API
route.post('/api/user/add',controller.create);
route.get('/api/user',controller.find);
route.get('/api/user/:id',controller.findById);
route.put('/api/user/update/:id',controller.update);
route.delete('/api/user/delete/:id',controller.delete);

module.exports=route;