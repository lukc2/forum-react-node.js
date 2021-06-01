module.exports = {
    //http://localhost:3000/api/logout GET
    logout: async (req, res) => {
        if (req.session.isLoggedIn == null || req.session.isLoggedIn == false) {
            res.redirect("/");
            return;
        }
        req.session.destroy((err) => {
            res.redirect("/");
        });

    }
}