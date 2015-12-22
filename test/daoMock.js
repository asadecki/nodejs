module.exports = function () {
        var books = {};

        return {
                insert: function (isbn, count) {
                        books[isbn] = count
                },

                findByIsbn: function (isbn) {
                        console.log(books);
                        return Promise.resolve([{isbn: isbn, count: books[isbn]}]);
                }
        }
};
