const express = require("express")
const User = require("../models/user")
const Message = require("../models/message")
const router = new express.Router();

// #####################

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", async (req, res, next) => {
    let result = await User.all()
    return res.json(result)
})


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username", async (req, res, next) => {
    let {username} = req.params;
    let result = await User.get(username)
    return res.json(result)
})

/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", async (req, res, next) => {
    let {username} = req.params;
    let result = await User.messagesTo(username);
    console.log(result.rows)
    return res.json(result.rows)
})


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/from", async (req, res, next) => {
    let { username } = req.params;
    let result = await User.messagesFrom(username);
    console.log(result.rows)
    return res.json(result.rows)
})


module.exports = router;