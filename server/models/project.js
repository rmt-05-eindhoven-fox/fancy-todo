'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Project extends Model { }
  Project.init({
    name: DataTypes.STRING
  }, { sequelize })

  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsToMany(models.User, { through: models.ProjectUser })
  };
  return Project;
};
