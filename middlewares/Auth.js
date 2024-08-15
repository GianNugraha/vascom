const { User } = require('../models');
const JWT = require('../helpers/JWT');

class Auth {
  static async authentication(req, res, next) {
    try {
      const access_token = req.headers.access_token;
      if (!access_token) {
        throw { message: `noAccess` };
      }
      const user = JWT.verifyToken(access_token);
      const userFromDB = await User.findByPk(user.id);
      if (!userFromDB) {
        throw { message: 'Invalid Authentication, Please Re-Login' };
      }
      req.user = userFromDB.dataValues;
      next();
    } catch (err) {
      next(err);
    }
  }
  static async authorization(req, res, next) {
    const access_token = req.headers.access_token;
      if (!access_token) {
        throw { message: `noAccess` };
      }
    const user = JWT.verifyToken(access_token);
      const userFromDB = await User.findByPk(user.id);
    try {
      if (userFromDB.role !== 'admin') {
        throw { message: `unauthorized` };
      }
      next();
    } catch (err) {
      next(err);
    }
  }
 
}
module.exports = Auth;
