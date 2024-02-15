const express=require("express");
const bodyParser= require("body-parser");
const app=express();



const db=require("./models");


const {rentalData}=require("./models")
app.use(bodyParser.json());

app.post("/insert",(req,res)=>{
    const{
        firstName,lastName,NumberOfWheels,TypeOfWheel,SpecificWheel,Date
    }=req.body;
    rentalData.create({
        "firstName":firstName,"lastName":lastName,"NumberOfWheels":NumberOfWheels,"TypeOfWheel":TypeOfWheel,
        "SpecificWheel":SpecificWheel,"Date":Date
    }).then(()=>{ res.send("inserted")}).catch((err)=>{
        console.log(err);
        
    });
})


app.get("/select",(req,res)=>{
    rentalData.findAll().then((users)=>{
        res.send(users)
    })
    
})

db.sequelize.sync().then((req)=>{
    app.listen(3001,()=>{
        console.log("server running")
    });
});