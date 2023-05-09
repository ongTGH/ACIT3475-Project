let petpalController = {
    index: (req, res) => {
        res.render("petpals/index");
    },
    signin: (req, res) => {
        res.render("auth/signin");
    },
    signup: (req, res) => {
        res.render("auth/signup");
    },
};

module.exports = petpalController;