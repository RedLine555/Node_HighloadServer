const path = require('path'),
    Users = require(path.resolve('server/services/db')).model('users');

module.exports = {
    userIdParam(req, res, next, id) {
        req.user = Users.get(+id);
        if (!req.user)
            res.status(404).send();
        else
            next();
    },
    get(req, res) {
        res.json(req.user);
    },
    getAll(req, res) {
        res.json(Users.getAll(req.query));
    },
    update(req, res) {
        let model = req.body;
        model.id = req.user.id;
        Users.update(model);
        res.status(200).send();
    },
    add(req, res) {
        let model = req.body;
        Users.add(model);
        res.status(200).send();
    },
    remove(id) {
        Users.remove(req.user.id);
        res.status(200).send();
    }
}