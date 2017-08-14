const express = require('express'),
    path = require('path'),
    visit_controller = require(path.resolve('server/controllers/visit.controller')),
    router = express.Router();

router.route('/visits')
    .get(visit_controller.getAll)

router.route('/visits/:visit_id')
    .get(visit_controller.get)
    .post(visit_controller.update)
    .delete(visit_controller.remove);

router.route('/visits/new')
    .post(visit_controller.add)

router.param('visit_id', visit_controller.visitIdParam)

module.exports = router;