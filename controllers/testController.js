// controllers/testController.js
const testUser = (req, res) => {
    try {
        res.status(200).json({ msg: "test user api!!!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Internal server error" });
    }
};

module.exports = testUser;
