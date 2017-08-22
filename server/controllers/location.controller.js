const path = require('path'),
    Locations = require(path.resolve('server/services/db')).model('locations');;

module.exports = {
    locationIdParam(req, res, next, id) {
        req.user = Locations.get(+id);
        if (!req.user)
            res.status(404).send();
        else
            next();
    },
    get(req, res) {
        res.json(req.user);
    },
    getAll(req, res) {
        res.json(Locations.getAll(req.query));
    },
    update(req, res) {
        let model = req.body;
        model.id = req.user.id;
        Locations.update(model);
        res.status(200).send();
    },
    add(req, res) {
        let model = req.body;
        Locations.add(model);
        res.status(200).send();
    },
    remove(id) {
        Locations.remove(req.user.id);
        res.status(200).send();
    }
}