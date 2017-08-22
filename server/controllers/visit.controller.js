const path = require('path'),
    Visits = require(path.resolve('server/services/db')).model('visits');;

module.exports = {
    visitIdParam(req, res, next, id) {
        req.user = Visits.get(+id);
        if (!req.user)
            res.status(404).send();
        else
            next();
    },
    get(req, res) {
        res.json(req.user);
    },
    getAll(req, res) {
        res.json(Visits.getAll(req.query));
    },
    update(req, res) {
        let model = req.body;
        model.id = req.user.id;
        Visits.update(model);
        res.status(200).send();
    },
    add(req, res) {
        let model = req.body;
        Visits.add(model);
        res.status(200).send();
    },
    remove(id) {
        Visits.remove(req.user.id);
        res.status(200).send();
    }
}