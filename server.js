const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(express.json()); // Parse JSON requests
app.use(cors());

const budgetSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
});

const Budget = mongoose.model('budgets', budgetSchema);
const url = 'mongodb://127.0.0.1:27017/instructions_part2';
mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true,})
.then(()=>{
    console.log("Connected to the database");
});

app.get('/budget',(req,res)=>{
    //console.log("Shashank Patlolla");
    Budget.find({})
    .then((data)=>{
        //console.log(data)
        res.json(data);
        //mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError);
    })
});

app.post('/budget',(req,res)=>{
    //console.log(req.body);
    const newData = req.body;
    Budget.insertMany(newData)
    .then((data)=>{
        res.json({ message: 'Data added successfully', insertedData: newData });
        //console.log(data);
        //mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError);
    })
});
app.listen(port,()=>{
    console.log(`App is listening at localhost:${port}`);
});