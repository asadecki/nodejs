var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI || 'mongodb://heroku_xgdwp6ms:bi2gegu00ldl0r2bjp1stseegg@ds033285.mongolab.com:33285/heroku_xgdwp6ms';
var connection = MongoClient.connect(url);

var insert = function (isbn, count) {
        connection.then(function (db) {
                        db.collection("books").updateOne({isbn: isbn}, {
                                isbn: isbn,
                                count: count
                        }, {upsert: true});
                }
        ).catch(function (reason) {
                        console.log("Aaaa " + reason);
                });
};

var findAll = function () {
        return connection.then(function (db) {
                        return db.collection("books")
                                .find({})
                                .toArray();
                }
        );
};

var findByIsbn = function (isbn) {
        return connection.then(function (db) {
                        return db.collection("books")
                                .find({"isbn": isbn})
                                .limit(1)
                                .toArray();
                }
        );
};

var dao = {insert: insert, findAll: findAll, findByIsbn: findByIsbn};

module.exports = dao;
