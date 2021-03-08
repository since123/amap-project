const Sequelize = require("sequelize");
const test = new Sequelize("mysql://root:txj7757930@localhost/test", {
  define: {
    timestamps: false,
  },
});

modules.exports = {
  Test,
};
