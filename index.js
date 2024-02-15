const express=require("express");
const bodyParser= require("body-parser");
const app=express();


const { sequelize } = require('./models');

const db=require("./models");


const {rentalData}=require("./models")
app.use(bodyParser.json());

app.post("/insert",(req,res)=>{
    const{
        firstName,lastName,NumberOfWheels,TypeOfVehicle,SpecificModel,Date
    }=req.body;
    rentalData.create({
        "firstName":firstName,"lastName":lastName,"NumberOfWheels":NumberOfWheels,"TypeOfVehicle":TypeOfVehicle,
        "SpecificModel":SpecificModel,"Date":Date
    }).then(()=>{ res.send("inserted")}).catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send("This date is already booked.Please select another date.");
        } else {
            console.log(err);
            res.status(500).send("Error occurred while inserting data");
        }
    });
})


app.get("/select",(req,res)=>{
    rentalData.findAll().then((users)=>{
        res.send(users)
    })
    
})
app.get('/twowheelerdata', async (req, res) => {
    try {
      const [twowheeler] = await sequelize.query('SELECT * FROM twowheelers');
      res.json(twowheeler);
    } catch (error) {
      console.error(error);
      
    }
  });

  app.get('/fourwheelerdata', async (req, res) => {
    try {
      const [fourwheeler] = await sequelize.query('SELECT * FROM fourwheelers');
      res.json(fourwheeler);
    } catch (error) {
      console.error(error);
      
    }
  });
  
db.sequelize.sync().then((req)=>{
    app.listen(3001,()=>{
        console.log("server running")
    });
});