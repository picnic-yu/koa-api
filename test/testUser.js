// testUser.js

var user = require('../model/user');

// 添加用户
user.addUser('terry', 'terry@163.com','chen').then(function() {
    // 查询新添加的用户
    return user.findByName('terry');
}).then(function(user) {
    console.log('****************************');
    console.log('user name: ', user.name);
    console.log('user email: ', user.mail);
});