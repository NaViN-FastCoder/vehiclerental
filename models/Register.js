

module.exports=(sequelize,DataTypes)=>{
    const Register=sequelize.define("SET",{
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
        TypeOfWheel:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        SpecificWheel:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        Date:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    });

    return Register;
};