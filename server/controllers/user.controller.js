const path = require('path'),
    db = require(path.resolve('server/services/db')),
    Locations = db.model('locations');
    Visits = db.model('visits'),
    Users = db.model('users');

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
    getUsers(req, res) {
        visits = Visits.getAll((memo, v) => {
            var location = Locations.get(+v.location);
            if (v.user === +req.params.user_id
                && (!req.query.fromDate || v.visited_at > req.query.fromDate)
                && (!req.query.toDate || v.visited_at < req.query.toDate)
                && (!req.query.country || location.country === req.query.country)
                && (!req.query.toDistance || location.distance < req.query.toDistance)) {
                    memo.push({
                         "mark": v.mark,
                        "visited_at": v.visited_at,
                        "place": location.place
                    })
                }
            return memo;
        }).sort((a, b) => a.visited_at - b.visited_at);
        res.json({visits});
    },
    getAll(req, res) {
        res.json(Users.getAll());
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