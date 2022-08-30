const router = require("express").Router();

//GET
router.get("/",(req,res)=>{
    res.send("hey its user router");
})


module.exports = router