const path = require('path'),
    users = require(path.resolve('tmp/data/users_1')).users;

module.exports = {
    getAll() {
        return users.slice();
    },
    get(id) {
        return users.find(u => u.id === id);
    },
    update(model) {
        let i = users.findIndex(u => u.id === id);
        users[i] = model;
    },
    add(model) {
        let user = users[users.length - 1];
        model.id = user.id + 1;
        users.push(user);
    },
    remove(id) {
        users = users.filter(u => u.id !== id);
    }
}