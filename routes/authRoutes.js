// const app = require("../app")
const express = require("express")
const User = require("../models/user")
const Message = require("../models/message")
const jwt = require("jsonwebtoken");
const { SECRET_KEY, DB_URI } = require('../config')

const router = new express.Router();

// #####################

router.get("/", async (req, res, next) => {
    return res.send('test authRoutes')
})



/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body;
        let response = await User.authenticate(username, password);
        console.log(response)
        return res.send(response)
    } catch (e) {
        next(e)
    }
})


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async (req, res, next) => {
    try {
        let { username, password, first_name, last_name, phone } = req.body;
        User.register(username, password, first_name, last_name, phone);

        let payload = {usermane:username, password:password, first_name:first_name, last_name:last_name, phone:phone}
        let token = jwt.sign(payload, SECRET_KEY);

        return res.send(token)
    } catch (e) {
        return next(e)
    }
})




module.exports = router;