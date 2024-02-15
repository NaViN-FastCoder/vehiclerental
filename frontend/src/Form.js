import React ,{useEffect, useState} from 'react';
import Numberofwheels from './Numberofwheels';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

function Form(){
    const[firstName,setFirstName]=useState('');
    const[lastName,setLastName]=useState('');
    const[firstPage,setFirstPage]=useState(true);
    const[nextPage,setNextPage]=useState(false);
    const[typeofVehiclePage,setTypeofVehiclePage]=useState(false);
    const[wheelValue,setWheelValue]=useState('');
    const[twoWheeler,setTwoWheeler]=useState(false);
    const [options, setOptions] = useState([]);

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
useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      // Extracting column names from the first user object
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
        {twoWheeler ? <div>
                        <label>Select type of vehicle</label>
                        <div>
      <h2>Choose a column:</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input type="radio" id={`option-${index}`} name="column" value={option} />
          <label htmlFor={`option-${index}`}>{option}</label>
        </div>
      ))}
    </div>
                    </div>
        
        
        
        
        
        
        :
        
        
        
        
        
        
        <div>Apple is false</div>}
        <div>Another div inside FirstPage conditional rendering</div>
    </div>
)}


               
              
            </div>
            
        </div>
        
    )
}
export default Form;