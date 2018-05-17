// user.js

var Sequelize = require('sequelize');
var sequelize = require('../db');

// 创建 model
var User = sequelize.define('user', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    mail: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // 对postgres来说会自动转为 SERIAL 
    }
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    freezeTableName: true
});

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
var user = User.sync({ force: false });

// 添加新用户
exports.addUser = function(name, mail,password) {
    // 向 user 表中插入数据
    return User.create({
        name: name,
        mail: mail,
        password:password
    }).then( (result) => {
        console.log(result);
    });

    // User.create({
    //     name: 'XiaoMing',
    //     password: '1234567890',
    //     mail: 'xiaoming@qq.com'
    // }).then(function(result){
    //         console.log('inserted XiaoMing ok');
    // }).catch(function(err){
    //         console.log('inserted XiaoMing error');
    //         console.log(err.message);
    // });
};


// 通过用户名查找用户
exports.findByName = function(name) {
    // return User.findAll({
    //     where: {name: name}
    // }).on('success',function (res) {
    //     console.log(res);
    // }).on('failure', function(err) {
    //     console.log(err);
    // });
    return User.findAll({
        where:{
            name:{
                $like:`${name}%`
            }
        }
    })
};
exports.findUser = function(name, password) {
    let obj = {};
    if(name){
        obj.name = name;
    }
    if(password){
        obj.name = password;
    }
    return User.findAll({
        where:obj
    })
};