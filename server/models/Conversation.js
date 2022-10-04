const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
  {
    persons: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
