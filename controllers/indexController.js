const express = requiere ("express"); 
const router= express.Router();

router.get ("/", (req, res)=> {
    res.send ("Index");
});

module.exports = router; 

