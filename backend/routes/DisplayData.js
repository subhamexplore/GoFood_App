const express = require('express');
const router = express.Router();

router.post('/foodata', async (req, res) => {
    try {
        // console.log(global.food_items);
        res.send([global.food_items, global.food_category]);
    } catch (error) {
        console.error(error);;
    }
})

module.exports = router;