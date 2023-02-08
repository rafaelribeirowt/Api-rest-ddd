export default (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    'wallet',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      idIuser: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },

    {
      timestamps: true,
      underscored: true,
      tableName: 'wallet',
      indexes: [{ unique: true, fields: ['id'] }],
    },
  );

  return Wallet;
};
