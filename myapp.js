module.exports = function (dao) {
        var express = require('express');
        var bodyParser = require('body-parser');
        var service = require('./service.js')(dao);
        var app = express();

        function logRequest(req, res, next) {
                console.log('Time:', Date.now());
                next();
        }

        function myError(req, res, next) {
                res.status(404).send('Sorry cant find that!');
        }

        app.use(bodyParser.json());

        app.get('/', logRequest, service.sayYo);

        app.post("/book", service.addBook);

        app.get('/books', logRequest, service.getAllBooks);

        app.get('/book/:isbn', logRequest, function (req, res) {
                if (req.accepts('json')) {
                        dao.findByIsbn(req.params.isbn).then(function (result) {
                                console.log("siema json" + result[0].count);
                                res.send({count: result[0].count});
                        });
                }

                if (req.accepts('text/html')) {
                        dao.findByIsbn(req.params.isbn).then(function (result) {
                                console.log("siema html" + result[0].count);
                                res.send("<div> Hello baby: " + result[0].count + "</div>");
                        });
                }


        });

        app.use(myError);
        return app;
};