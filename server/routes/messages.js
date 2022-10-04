const router = require("express").Router();
const Message = require("../models/Message");
//SEND MESSAGE
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const sendMessage = await newMessage.save();
    res.status(200).json(sendMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET MESSAGE
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
