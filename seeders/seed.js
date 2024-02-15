const { Sequelize, DataTypes } = require('sequelize');


const Sequelizee = new Sequelize('vehiclerental', 'root', 'student', {
    dialect: 'mysql',
    host: 'localhost'
  });

const twoWheeler = Sequelizee.define('twoWheeler', {
    Cruiser: { type: DataTypes.STRING,unique: true },
    Sports: { type: DataTypes.STRING ,unique: true}
  });
  twoWheeler.sync().then(() => {
    twoWheeler.create({
      Cruiser: 'Royal Enfield Hunter 350uquen',
      Sports: 'KTM RC 125'
    });
   
  });

  const fourWheeler = Sequelizee.define('fourWheeler', {
    Hatchback: { type: DataTypes.STRING,unique: true },
    Suden: { type: DataTypes.STRING ,unique: true},
    SUV:{type:DataTypes.STRING,unique: true}
  });
  fourWheeler.sync().then(() => {
    fourWheeler.create({
        Hatchback: 'Mahindra Scorpio N',
        Suden: 'Mercedes-Benz',
        SUV:'Tata Safari Dicor'
    });
   
  });