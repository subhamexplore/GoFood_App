const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/goFoofMern').then(async ()=>{
    console.log("Connection Successfull");
    try {
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;
        // console.log(global.food_items);
        const fetched_catData = await mongoose.connection.db.collection("food_category");
        const catData = await fetched_catData.find({}).toArray();
        global.food_category = catData;
    } catch (error) {
        console.log(error);
    }
}).catch((e)=>{
    console.log("No Connection");
})
