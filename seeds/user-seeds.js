const sequelize = require('../config/connection');
const {User, Favorites} = require('../models');

const userdata = [
    {
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'johndoe123'
    },
    {
        username: 'janedoe',
        email: 'janedoe@gmail.com',
        password: 'janedoe123'
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});
module.exports = seedUsers;