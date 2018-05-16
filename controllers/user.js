'use strict';

const router = require('koa-router')();

const HttpStatus = require('../utils/httpStatusCode');

//just for test
const todolist = require('../todo_list');

//set the api prefix
router.prefix('/api/v1');


var user = require('../model/user');






//get tasks router
router.get('/tasks', async (ctx, next) => {
  ctx.response.type = 'application/json';
  ctx.response.status = HttpStatus.OK;
  ctx.response.body = todolist;
});

//get tasks/task_id router
router.get('/tasks/:task_id', async (ctx, next) => {
    var task_id = ctx.params.task_id;
    var result = '{"code":"task:task_not_found","msg":"task not found"}';
    var status = HttpStatus.BAD_REQUEST;

    ctx.response.type = 'application/json';
    for(let i in todolist.tasks){
        if(task_id === todolist.tasks[i].id.toString()){
            result = todolist.tasks[i];
            status = HttpStatus.OK;
            break;           
        }
    }
    ctx.response.body = result; 
    ctx.response.status = status;    
});

//post tasks (add new task)
router.post('/register', async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var mail = ctx.request.body.mail || '';
    var password = ctx.request.body.password || '';

    ctx.response.type = 'application/json';
    console.log(2222222222222);
    console.log(user)
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



module.exports = router;
