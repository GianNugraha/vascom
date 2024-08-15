const UserRepository = require('./UserRepository');
// const { sequelize, Sequelize, User } = require('../../models');
const { sequelize } = require('../../models');
const bcrypt = require("bcrypt");
const hashPassword = require("../../helpers/hashPassword");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const ProductRepository = require('../products/ProductRepository');
const empty = [undefined, null, 'null', ''];
class UserService {
  static async login(data) {
    try {
      let findUser;
      if (data.username) {
        findUser = await UserRepository.checkUsername(data.username);
      }
      
      if (!findUser) {
        throw { api: 'user', message: 'notFound-login, username not found !' };
      }

      const bcryptPass = await  bcrypt.compareSync(data.password, findUser.password);
      if (bcryptPass != true) {
        throw { api: 'user', message: 'forbidden-login , wrong password !' };
      }
   
      const dattoken = {
        id: findUser.id,
        username: findUser.username,
      };
      const datum = {
        id: findUser.id,
        username: findUser.username,
        role: findUser.role
      }
      const access_token = jwt.sign(dattoken, secretkey);
      return { 
        access_token: access_token, 
        dataUser: datum

      };
    } catch (error) {
      throw error;
    }
  }

  static async getAllUser(req) {
    return UserRepository.getAllUser(req);
  }

  static async getUserDetail(id) {
    let user = await UserRepository.findOneUser({ id: id });
    return user ;
  }

  static async register(inputValues){
    try {
      const {username, role, email, password, confirmPassword } = inputValues;

      if (!username || !role || !email || !password || !confirmPassword) {
        throw { message: "badRequest - Data Harus di isi semua" };
      }
      if (inputValues.password != inputValues.confirmPassword)
        throw new NotFoundError(
          "Password dan konfirmasi password tidak sama",
          1
        );

      let cekUsername = await UserRepository.findAllUser(username);

      if (cekUsername == "") {
        try {
          let user = {
            id: uuidv4(),
            ...inputValues,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          };
          const Users = await UserRepository.register(user);
          return Users;
        } catch (e) {
          throw e;
        }
      } else {
        throw { message: "badRequest - username Sudah Terdaftar" };
      }
    } catch (e) {
      throw(e);
    }
  }

  static async updateUser(id, inputValues) {
    const transaction = await sequelize.transaction();
    try {
      const checkUser = await UserRepository.findOneUser({ id: id });
      if (!checkUser) throw new Error(`User with id ${id} Not Found`);
  
      const column = ['username', 'email', 'password'];
      let data = {};
      let userData = {};
  
      for (const key in inputValues) {
        if (column.includes(key)) {
          const value = key === 'password' ? await hashPassword(inputValues[key]) : inputValues[key];
          data = { ...data, [key]: value };
  
          if (key === 'username' || key === 'password' || key === 'email') {
            userData = { ...userData, [key]: value };
          }
        }
      }
  
      if (Object.keys(data).length === 0) throw new Error('No Fields Changed.');
  
      if (inputValues.email) {
        const checkEmail = await UserRepository.checkEmail(data.email);
        if (checkEmail) throw new Error('Email already exists');
      }
  
      const updateUserData = await UserRepository.patchUser(id, {
        ...data,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, transaction);
      
      await transaction.commit();
      return { updateUserData };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deactivateUser(id) {
    if (!id === undefined) {
      throw new Error('ID not found');
    }

    try {
      const result = await UserRepository.deactivateUser(id);
      return result;
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error.message);
      throw new Error(`Failed to delete user : ${error.message}`);
    }
  }

}

module.exports = UserService;
