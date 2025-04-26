const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class team extends Model {}

team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    member1: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "slot empty",
    },
    member2: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "slot empty",
    },
    member3: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "slot empty",
    },
    member4: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "slot empty",
    },
    member5: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "slot empty",
    },
  },
  {
    hooks: {
      async beforeCreate(newTeamData) {
        newTeamData.member1 = await newTeamData.member1;
        newTeamData.member2 = await newTeamData.member2;
        newTeamData.member3 = await newTeamData.member3;
        newTeamData.member4 = await newTeamData.member4;
        newTeamData.member5 = await newTeamData.member5;
        return newTeamData;
      },
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "team",
  }
);
