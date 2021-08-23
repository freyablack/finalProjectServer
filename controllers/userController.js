require('dotenv').config()
const router = require('express').Router();
const {UserModel} = require('../models');
const {UniqueConstraintError} = require('sequelize/lib/errors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  let {firstName, lastName, username, email, password} = req.body.user
  try {
    const User = await UserModel.create({
      firstName,
      lastName,
      username,
      email,
      password: bcrypt.hashSync(password, 13)
    })

    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 168})

    res.status(201).json({
      message: 'User registered successfully',
      user: User,
      sessionToken: token
    })
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: 'Email already in use'
      })
    } else {
      res.status(500).json({
        message: `Failed to register user ${err}`
      })
    }
  }
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body.user;

  try {
    let loginUser = await UserModel.findOne({
      where: {
        email
      }
    });
    if (loginUser) {
      let passwordComparison = await bcrypt.compare(password, loginUser.password);
      if (passwordComparison) {
        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 168});
        res.status(200).json({
          message: 'User successfully logged in!',
          sessionToken: token
        });
      } else {
        res.status(401).json({
          message: 'Incorrect email or password'
        });
      }
    } else {
      res.status(401).json({
        message: 'Incorrect email or password'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error logging in!'
    });
  }
})




module.exports = router