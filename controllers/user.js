'use strict';

const router = require('koa-router')();

const HttpStatus = require('../utils/httpStatusCode');
//set the api prefix
router.prefix('/api/v1');
var user = require('../model/user');
//post tasks (add new task)
router.post('/register', async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var mail = ctx.request.body.mail || '';
    var password = ctx.request.body.password || '';

    ctx.response.type = 'application/json';
    console.log(ctx.request.body)
    if('' === name){
        //title is empty
        ctx.response.status = HttpStatus.BAD_REQUEST;
        ctx.response.body = '{"code":"username is empty","msg":"name  must be not empty"}';
    }else{
        // 添加用户
        user.addUser(name, mail,password).then(function() {
            ctx.response.status = HttpStatus.CREATED;
            ctx.response.body = {
                msg:'chenggong'
            };
        });
    }
});
//post tasks (add new task)
router.post('/list', async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var mail = ctx.request.body.mail || '';
    var password = ctx.request.body.password || '';
    var result = '{"code":"task:task_not_found","msg":"task not found"}';
    var status = HttpStatus.BAD_REQUEST;
    ctx.response.type = 'application/json';  
    await user.findByName(name).then(function(result){
        console.log('query all users');

        for (var i = 0, usr; usr = result[i++];) {
            console.log('name=' + usr.name + ', password=' + usr.password + ', mail=' + usr.mail);
        }
        result = {
            content:result,
            code:HttpStatus.OK
        }; 
        status = HttpStatus.OK;  
        ctx.response.body = result; 
        ctx.response.status = status; 
       
    }).catch(function(err){
        // sql语句错误捕捉
        console.log(err);
        result = {
            content:[],
            code:500,
            msg:'服务器错误'
        };  
        ctx.response.body = result; 
        ctx.response.status = 200; 
    });
});
router.post('/user', async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var mail = ctx.request.body.mail || '';
    var password = ctx.request.body.password || '';
    var result = '{"code":"task:task_not_found","msg":"task not found"}';
    var status = HttpStatus.BAD_REQUEST;
    ctx.response.type = 'application/json';  
    user.findUser(name, password).then(function(result){
        
        result = {
            content:result,
            code:HttpStatus.OK
        }; 
        status = HttpStatus.OK;  
        ctx.response.body = result; 
        ctx.response.status = status; 
        console.log('status',status);
        console.log('result',result);
        console.log('response.result',ctx.response.body);
        console.log(ctx.response)
    }).catch(function(err){
        // sql语句错误捕捉
        console.log(err);
    });
});


module.exports = router;
