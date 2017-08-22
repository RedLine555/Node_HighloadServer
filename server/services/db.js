const path = require('path'),
    //users = require(path.resolve('tmp/data/users_1')).users;

buildModel = function(data) {
    query_filter = (o, query) => {
        let res = true;
        for(let key in query) {
            if (o[key] && o[key] !== query[key]) {
                return false;
            }
        }
        return true;
    }
    return {
        getAll(query) {
            return data.filter(o => query_filter(o));
        },
        get(id) {
            return data.find(u => u.id === id);
        },
        update(model) {
            let i = data.findIndex(u => u.id === id);
            data[i] = model;
        },
        add(model) {
            let user = data[users.length - 1];
            model.id = user.id + 1;
            data.push(user);
        },
        remove(id) {
            data = data.filter(u => u.id !== id);
        }
    }
}

module.exports = {
    cash: {},
    model(model) {
        if (!this.cash[model]) {
            let data = require(path.resolve(`tmp/data/${model}_1`))[model];
            this.cash[model] = buildModel(data);
        }
        return this.cash[model];
    },
}