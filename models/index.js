//stuff and things
const User = require('./User');
const Favorites = require('./Favorites');

User.hasMany(Favorites, {
    foreignKey: 'user_id'
});

Favorites.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Favorites };