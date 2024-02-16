import React ,{useEffect, useState} from 'react';
import Numberofwheels from './Numberofwheels';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
function Form(){
    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[firstPage,setFirstPage]=useState(true);
    const[nextPage,setNextPage]=useState(false);
    const[typeofVehiclePage,setTypeofVehiclePage]=useState(false);
    const[wheelValue,setWheelValue]=useState('');
    const[twoWheeler,setTwoWheeler]=useState(false);
    const [options, setOptions] = useState([]);
    const[vehicleType,setVehicleType]=useState([]);
    const[hideOptions,sethideOptions]=useStatee(true);
    const[vehicleModel,setVehicleModel]=useState(false);
    const[datePage,setDatePage]=useState(false);
    const[date,setDate]=useState(null);

    const handleNext=()=>{
        setFirstPage(false)
        setNextPage(true);
    }

    const handlewheelChange = (event) => {
        setWheelValue(event.target.value);
      };

      const handleFirstNameChange=(event)=>{
        setFirstName(event.target.value);
      }

      const handleLastNameChange=(event)=>{
        setLastName(event.target.value);
      }

      const handleWheelNextPage=()=>{
        setNextPage(false);
        setTypeofVehiclePage(true);
      }

      const changeVehicleType=(event)=>{
            setVehicleType(event.target.value);
      }


      const handleVehicleSelection=()=>{
        
        sethideOptions(false);
        setVehicleModel(true);


      }
      const handleDatePage=()=>{
        setVehicleModel(false);
        setTypeofVehiclePage(false);
        setDatePage(true);
      }
      const handleDateChange=(event)=>{

        setDate(event.target.value)
      }


useEffect(()=>{
    fetch('https://localhost:3001//twowheelerdata')
    .then(response => response.json())
    .then(data => {
      
      const columnNames = Object.keys(data[0]);
      setOptions(columnNames);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);


    return(
        <div>
            <div>
                {firstPage && (
                    <div>
                <label>First , what's your name</label>
                <div>
                    <label>First Name</label>
                    <input type='text' value={firstName} onChange={handleFirstNameChange}/>

                    <label>Last Name</label>
                    <input type='text' value={lastName} onChange={handleLastNameChange}/>
                    
                    <button onClick={handleNext}>Next</button></div>
                </div>)}


               { nextPage && (
                
                <FormControl component="fieldset">
                <FormLabel component="legend">Select Number of wheels</FormLabel>
                
                <RadioGroup
                  aria-label="numberofwheels"
                  name="numberofwheels"
                  value={wheelValue}
                  onChange={handlewheelChange}
                >

                  <FormControlLabel value="two-wheeler" control={<Radio />} label="2-wheeler" />
                  <FormControlLabel value="four-wheeler" control={<Radio />} label="4-wheeler" />
       
                </RadioGroup>
                <button onClick={handleWheelNextPage}>Next</button>
              </FormControl>
             

              

               )}

        {typeofVehiclePage && (
    <div>

        {twoWheeler ?
                        <div>
          
                        <div>
                       
       <label>Select type of vehicle</label>

      


      {options.map((option, index) => (
        <div key={index}>


          <input type="radio"
           id={`option-${index}`} 
           name="column"
            value={option}
            onChange={changeVehicleType} />

          <label htmlFor={`option-${index}`}>  {option}  </label>

          

        </div>
      ))}
      {hideOptions &&(
      <button onClick={handleVehicleSelection}>Next</button>)}

      
      <div>
        
{vehicleModel &&(
        <FormControl component="fieldset">
                <FormLabel component="legend">Select Model</FormLabel>
                
                <RadioGroup
                  aria-label="selectmodel"
                  name="modelselection"
                  value={wheelValue}
                  onChange={handlemodelChange}
                >

                  <FormControlLabel value={vehicleType.value} control={<Radio />} label={vehicleType.value} />

       
                </RadioGroup>
                <button onClick={handleDatePage}>Next</button>
              </FormControl>)}


        </div>


    </div>
                    </div>
        
        
        
        
        
        
        :
        
        
        
        
        
        
        <div>Fourwheeler</div>}
        <div>Fourwheeler</div>
    </div>
)}

{datePage && (

  
<StaticDatePicker
label="Select Date"
value={date}
onChange={handleDateChange}
/>
)}


               
              
            </div>
            
        </div>
        
    )
}
export default Form;