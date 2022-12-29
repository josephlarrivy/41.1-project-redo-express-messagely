const express = require("express")
const User = require("../models/user")
const Message = require("../models/message");
const { DB_URI } = require("../config");
const router = new express.Router();

// #####################

router.get("/", async (req, res, next) => {
    return res.send('test messagesRoutes')
})

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', async (req, res, next) => {
    let { to_username, from_username, body } = req.body;
    console.log({to_username, from_username, body})
    let response = await Message.create({to_username, from_username, body})
    return res.json(response)
})




/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

module.exports = router;