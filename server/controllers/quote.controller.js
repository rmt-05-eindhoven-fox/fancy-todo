const axios = require("axios")
class Quote {
    static async randomQuote(req, res, next) {
        try {
            const joke = await axios({
                url: `https://programming-quotes-api.herokuapp.com/quotes/random
            `,
                method: "GET",
            });
            res.status(200).json(joke.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Quote