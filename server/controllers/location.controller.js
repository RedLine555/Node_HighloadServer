const path = require('path'),
    db = require(path.resolve('server/services/db')),
    Users = db.model('users'),
    Visits = db.model('visits'),
    Locations = db.model('locations');

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
    getAver(req, res) {
        arr = Visits.getAll((memo, v) => {
            var user = Users.get(+v.user);
            if (v.location === +req.params.location_id
                && (!req.query.fromDate || v.visited_at > req.query.fromDate)
                && (!req.query.toDate || v.visited_at < req.query.toDate)
                && (!req.query.fromAge || new Date(Date.now() - user.birth_date).getYear() > req.query.fromAge)
                && (!req.query.toAge || new Date(Date.now() - user.birth_date).getYear() < req.query.toAge)
                && (!req.query.gender || user.gender === req.query.gender)) {
                    memo.push(v.mark)
                }
            return memo;
        });
        res.json({
            avg : arr.length === 0 ? 0 :parseFloat((arr.reduce((sum, cur) => sum += cur, 0) / arr.length).toFixed(5))
        })
    },
    getAll(req, res) {
        res.json(Locations.getAll());
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