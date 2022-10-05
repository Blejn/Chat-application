const router = require("express").Router();
const Conversation = require("../models/Conversation");
//CREATE A CONVERSATION
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    persons: [req.body.senderId, req.body.recipientId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET A CONVERSATION
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      persons: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      persons: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
});
module.exports = router;
