const { Member, User, Sequelize } = require("../../models");
const { Op, QueryTypes } = require("sequelize");

class UserRepository {
  static async findAllUser(condition) {
    try {
      const data = await User.findAll({
        where: { username: condition },
      })
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findOneUser(condition) {
    try {
      let users = await User.findAll({
        where: condition,
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUser(req) {
    try {
      const take = parseInt(req.query.take) || 10;
      const skip = parseInt(req.query.skip) || 0; 
      const search = req.query.search || '';
      const data = await User.findAndCountAll({
        where: {
          username: {
            [Op.like]: `%${search}%`
          }
        },
        limit: take,
        offset: skip,
        order: [['createdAt', 'DESC']]
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllAdmin() {
    try {
      const data = await User.findAndCountAll({
        order: [["created_at", "DESC"]]
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  static async register(inputValues) {
    try {
      // console.log(inputValues);
      
      return await User.create(inputValues);
    } catch (error) {
      throw error;
    }
  }

  static async checkUsername(username) {
    try {
      const list = await User.findOne({
        where: { username }
      });
      return list
      
    } catch (error) {
      throw error;
    }
  }

  static async checkUsernames(username) {
    try {
      
      const arra = await User.findOne({
        where: {
          username: username,
        },
      });
      
    } catch (error) {
      throw error;
    }
  }

  static async patchUser(id, inputValues, t) {
    try {
      const user = await User.update(inputValues, {
        where: {
          id: id,
        },
        transaction: t,
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deactivateUser(id) {
    try {
      const [affectedRows] = await User.update(
        { isActive: "false" },
        { where: { id } }
      );
      if (affectedRows === 0) {
        throw new Error(`User with ID ${id} not found`);
      }
      return { message: ` delete successfully` };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
