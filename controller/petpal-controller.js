let petpalController = {
    index: (req, res) => {
        res.render("petpals/index");
    },
    login: (req, res) => {
        res.render("auth/login");
    },
    signup: (req, res) => {
        res.render("auth/signup");
    },
};

module.exports = petpalController;