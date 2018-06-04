'use strict';

const router = require('koa-router')();

const HttpStatus = require('../utils/httpStatusCode');



//set the api prefix
router.prefix('/api/v1');



module.exports = router;
