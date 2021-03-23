const { Op } = require('sequelize');

const User = require('../models/User');

module.exports = {
  async show(request, response) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.like]: '%@rocketseat.com.br'
        },
      },
      include: [
        {
          association: 'addresses',
          where: {
            street: 'Rua José Alvim'
          }
        },
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.like]: 'React%'
            }
          }
        }
      ]
    });

    return response.json(users);
  }
};