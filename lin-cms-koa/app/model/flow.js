import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Flow extends Model {
}

Flow.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    index: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    art_id: {
        type: Sequelize.INTEGER,
        allowNull:true
    },
    status:{
        type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'flow',
    modelName: 'Flow',
    paranoid: true,
    underscored:true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
  }
);

export { Flow as FlowModel };