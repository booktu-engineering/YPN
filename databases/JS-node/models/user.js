'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    meta: DataTypes.JSONB
    lga: DataTypes.STRING, 
    phone: DataTypes.INTEGER,
    roles: DataTypes.ARRAY(Sequelize.TEXT)
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
