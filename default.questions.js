var questions = {
  restart: {
    type: "confirm",
    name: "restart",
    message: "Restart this prompt? (yes)",
    default: false
  },
  size: {
    type: "list",
    name: "size",
    message: "What size do you need",
    choices: ["Large", "Standard", "Medium", "Small"],
    filter: function (val) { return val.toLowerCase(); }
  }
};


module.exports = questions;
