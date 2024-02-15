

module.exports=(sequelize,DataTypes)=>{
    const Register=sequelize.define("rentalData",{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        NumberOfWheels:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        TypeOfVehicle:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        SpecificModel:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
                
            },
           
        },
        Date:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    },{
    indexes: [{
        unique: true,
        fields: ['SpecificModel', 'Date']
    }]}
    )
  
    return Register;
};