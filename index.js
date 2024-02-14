const express=require("express");

const app=express();



const db=require("./models");

const {SET}=require("./models")

app.get("/insert",(req,res)=>{
    SET.create({
        firstName:"Niraj",
        lastName:"Tank",
        NumberOfWheels:"44",
        TypeOfWheel:"2-WHEELER",
        SpecificWheel:"Contra",
        Date:"2023-02-22"

    }).then(()=>{ res.send("inserted")}).catch((err)=>{
        console.log(err);
        
    });
   
});

app.get("/select",(req,res)=>{
    SET.findAll().then((users)=>{
        res.send(users)
    })
    
})

db.sequelize.sync().then((req)=>{
    app.listen(3001,()=>{
        console.log("server running")
    });
});