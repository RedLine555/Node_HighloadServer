const express = require('express'),
    path = require('path'),
    location_controller = require(path.resolve('server/controllers/location.controller')),
    router = express.Router();

router.route('/locations')
    .get(location_controller.getAll)

router.route('/locations/:location_id/avg')
    .get(location_controller.getAver);

router.route('/locations/:location_id')
    .get(location_controller.get)
    .post(location_controller.update)
    .delete(location_controller.remove);

router.route('/locations/new')
    .post(location_controller.add)

router.param('location_id', location_controller.locationIdParam)

module.exports = router;