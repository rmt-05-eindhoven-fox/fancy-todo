'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.hasMany(models.project_member, { foreignKey: 'project_id',as:'members'})
    }
  };
  project.init({
    project_name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "project name is required"
        },
        notNull:{
          args: true,
          msg: "project name is required"
        }
      }
    },
    project_status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['open', 'close'],
      validate: {
        notEmpty: {
          args: true,
          msg: "project status is required"
        },
        notNull:{
          args: true,
          msg: "project status is required"
        },
        isIn:{
          args:[['open', 'close']],
          msg:"project status should be open or close"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};