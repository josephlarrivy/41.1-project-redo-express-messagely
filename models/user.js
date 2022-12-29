/** User class for message.ly */
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

const ExpressError = require("../expressError");
const db = require("../db");

/** User of the site. */

class User {
  // constructor({username, password, first_name, last_name, phone}) {
  //   this.username = username;
  //   this.password = password;
  //   this.first_name = first_name;
  //   this.last_name = last_name;
  //   this.phone = phone;
  // }

  /* register new user -- returns 
  {username, password, first_name, last_name, phone}*/
  static async register(username, password, first_name, last_name, phone) {
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username,password,first_name,last_name,phone,join_at,last_login_at)
            VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            RETURNING username, password, first_name, last_name, phone`,
      [username, hashedPassword, first_name, last_name, phone]
    );
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    try {
      let response = await db.query('SELECT password FROM users WHERE username = $1', [username])
      let user = response.rows[0]
      if (user) {
        if (await bcrypt.compare(password, user.password) === true) {
          let token = jwt.sign({username:username, password:user.password}, SECRET_KEY);
          return ({token});
        }
      }
    } catch (e) {
      return e
    }
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    try {
      let response = await db.query('UPDATE users SET last_login_at = current_timestamp WHERE username = $1', [username]);

      if (!result.rows[0]) {
        throw new ExpressError(`No such user: ${username}`, 404);
      }
    } catch (e) {
      return e
    }
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    try {
      let result = await db.query('SELECT username, first_name, last_name, phone FROM users');
      return (result.rows)
    } catch (e) {
      return e
    }
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    try {
      let result = await db.query('SELECT username, first_name, last_name, phone FROM users WHERE username = $1', [username]);
      return (result.rows[0])
    } catch (e) {
      return e
    }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { }






}


module.exports = User;