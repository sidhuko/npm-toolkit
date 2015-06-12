var questions = {
  restart: {
    name: "restart",
    type: "confirm",
    message: "Restart this prompt? (no)",
    default: false
  },
  quit: {
    name: "quit",
    type: "confirm",
    message: "Do you want to quit? (yes)",
    default: true
  },
  size: {
    name: "size",
    type: "list",
    message: "What size do you need",
    choices: ["Large", "Standard", "Medium", "Small"],
    filter: function (val) {
      return val.toLowerCase();
    }
  }
};


module.exports = questions;
