var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/bookinventory';
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
