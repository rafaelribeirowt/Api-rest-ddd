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
      id_user: {
        type: DataTypes.UUID,
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
