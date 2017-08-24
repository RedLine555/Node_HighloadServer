const express = require('express'),
    path = require('path'),
    user_controller = require(path.resolve('server/controllers/user.controller')),
    router = express.Router();

router.route('/users/:user_id/visits')
    .get(user_controller.getUsers)

router.route('/users')
    .get(user_controller.getAll)

router.route('/users/:user_id')
    .get(user_controller.get)
    .post(user_controller.update)
    .delete(user_controller.remove);

router.route('/users/new')
    .post(user_controller.add)

router.param('user_id', user_controller.userIdParam)

module.exports = router;