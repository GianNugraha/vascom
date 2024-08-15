require("dotenv").config();
const UserService = require("./UserService");

class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw { api: "user", message: "badRequest-login" };
      }
      const signRes = await UserService.login(req.body);

      res.status(200).json(signRes);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const User = await UserService.getAllUser(req);
      res.status(200).json(User);
    } catch (e) {
      throw(e);
    }
  }

  static async getUserDetail(req, res, next) {
    try {
      const { id } = req.params;
      const User = await UserService.getUserDetail(id);
      res.status(200).json(User);
    } catch (e) {
      throw(e);
    }
  }

  static async register(req, res, next) {
    try {
      const User = await UserService.register(req.body);
      res.status(201).json(User);
    } catch (e) {
      next(e);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      
      const users = await UserService.updateUser(id, req.body);
      res
        .status(200)
        .json({ message: 'Success Update User', users: users });
    } catch (error) {
      throw(error);
    }
  }

  static async deactivateUser(req, res, next) {
    try {
      
      const { id } = req.params;

      const result = await UserService.deactivateUser(id);

    res.json(result);

    }
   catch (error) {
    console.error('Failed to delete user :', error);
    res.status(500).json({
      message: error.message || 'Failed to delete user ',
    });
  }
  }

}

module.exports = UserController;
