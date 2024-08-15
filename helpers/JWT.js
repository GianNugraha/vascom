const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
class JWT {
  static verifyToken(x) {
    return jwt.verify(x, secretkey);
  }

  static signToken(x) {
    return jwt.sign(x, secretkey);
  }

}
module.exports = JWT;
