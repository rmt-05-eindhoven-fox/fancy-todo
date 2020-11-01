'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProjectUser.belongsTo(models.User,{foreignKey:"UserId"})
      ProjectUser.belongsTo(models.Project,{foreignKey:"ProjectId"})
    }
  };
  ProjectUser.init({
    UserId: DataTypes.STRING,
    ProjectId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectUser',
  });
  return ProjectUser;
};