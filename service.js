module.exports = function (dao) {
        return {
                addBook: function (req, res) {
                        var isbn = req.body.isbn;
                        var count = req.body.count;

                        dao.insert(isbn, count);

                        res.json({isbn: isbn, count: count});
                },

                sayYo: function (req, res) {
                        res.send("yo yo yo");
                },

                getAllBooks: function (req, res) {
                        dao.findAll().then(function (result) {
                                console.log(result);
                                res.send(result);
                        });

                }
        };
};
