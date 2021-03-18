const Sequelize = require("sequelize");
const Test = new Sequelize("mysql://root:txj7757930@localhost/test", {
  define: {
    timestamps: false,
  },
});

module.exports = {
  Test,
};
