// const app = require("../app")
const express = require("express")
const User = require("../models/user")
const Message = require("../models/message")
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


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */




module.exports = router;