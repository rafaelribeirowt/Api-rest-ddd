import runner from '../../sequelize/runner';

export default {
  up: async (queryInterface, Sequelize) => {
    const CREATE_USER = () =>
      queryInterface.createTable('user', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING(250),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          ),
        },
      });
    const CREATE_WALLET = () =>
      queryInterface.createTable('wallet', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        id_user: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "user",
            key: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
        balance: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          ),
        },
      });
    await runner.run([() => CREATE_USER(), () => CREATE_WALLET()]);
  },

  down: (queryInterface, Sequelize) => {
    return runner.run([
      () => queryInterface.dropTable('user').dropTable('wallet'),
    ]);
  },
};
