export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
      },
    },

    {
      timestamps: true,
      underscored: true,
      tableName: 'user',
      indexes: [{ unique: true, fields: ['email'] }],
    },
  );

  User.associate = (models) => {
    User.hasOne(models.Wallet, { as: 'Wallet', foreignKey: 'id' });
  };

  return User;
};
