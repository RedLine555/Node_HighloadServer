const path = require('path'),
    db = require(path.resolve('server/services/db'));

module.exports = {
    visitIdParam(req, res, next, id) {
        req.user = db.get(+id);
        if (!req.user)
            res.status(404).send();
        else
            next();
    },
    get(req, res) {
        res.json(req.user);
    },
    getAll(req, res) {
        res.json(db.getAll());
    },
    update(req, res) {
        let model = req.body;
        model.id = req.user.id;
        db.update(model);
        res.status(200).send();
    },
    add(req, res) {
        let model = req.body;
        db.add(model);
        res.status(200).send();
    },
    remove(id) {
        db.remove(req.user.id);
        res.status(200).send();
    }
}