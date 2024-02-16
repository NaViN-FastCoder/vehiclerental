import React ,{useEffect, useState} from 'react';
import 'tailwindcss/tailwind.css';
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
    const[vehicleType,setVehicleType]=useState('');
    const[hideOptions,sethideOptions]=useState(true);
    const[vehicleModel,setVehicleModel]=useState(false);
    const[datePage,setDatePage]=useState(false);
    const[date,setDate]=useState(null);
    const[fourWheelerOptions,setFourWheelerOptions]=useState([]);
    const[model,setModel]=useState('');
    const [data,setData]=useState([]);
    //gotosecondpage
    const handleNext=()=>{
        setFirstPage(false)
        setNextPage(true);
    }

    //Two-wheeler or four-wheeler
    const handlewheelChange = (event) => {
        setWheelValue(event.target.value);
      };

      //Getting name of user
      const handleFirstNameChange=(event)=>{
        setFirstName(event.target.value);
      }

      const handleLastNameChange=(event)=>{
        setLastName(event.target.value);
      }

      //Getting options for two-wheeler and four wheeler
      const handleWheelNextPage=()=>{
        setNextPage(false);
        setTypeofVehiclePage(true);
        if(wheelValue==='two-wheeler')
        {
          setTwoWheeler(true);
        }
      }

      //Vehicle type is it sports or some other
      const changeVehicleType=(event)=>{
            setVehicleType(event.target.value);
      }

      //Specific model of the selected vehicle type
      const handlemodelChange=(event)=>{
        setModel(event.target.value);
      }

      //Displaying page for Asking user to select a particular model
      const handleVehicleSelection=()=>{        
        sethideOptions(false);
        setVehicleModel(true);
      }

      //Go to date page
      const handleDatePage=()=>{
        setVehicleModel(false);
        setTypeofVehiclePage(false);
        setDatePage(true);
      }

      //getting date value
      const handleDateChange=(event)=>{
        setDate(event.target.value)
      }

      //finalizing booking
      const book=async(e)=>{
          e.preventDefault();
          setData(...data,[firstName,lastName,wheelValue,vehicleType,model,date])
          try{
            const response=await fetch('https://localhost:3001/insert',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'},
              body:JSON.stringify(data),
            })
           if(response.OK){
              alert('Booking is successful');
           }
            }catch(error){
              alert(error);//Stating the specific error coming like change the date if its booked (added in backend)
            }
          
      }
    //getting data for two wheeler
    useEffect(()=>{
          fetch('https://localhost:3001/twowheelerdata')
          .then(response => response.json())
          .then(data => {
      
          const columnNames = Object.keys(data[0]);
          setOptions(columnNames);
        })
          .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    //getting data for four wheeler
      useEffect(()=>{
        fetch('https://localhost:3001/fourwheelerdata')
        .then(response => response.json())
        .then(data => {
        const columnNames = Object.keys(data[0]);
        setFourWheelerOptions(columnNames);
     })
       .catch(error => {
         console.error('Error fetching data:', error);
      });
    }, []);
 


    return(
        <div>
            <div className='flex'>
              {/* First Question */}
                {firstPage && (
                    <div>
                <label className='font-bold '>First , what's your name</label>
                <div>
                    <label className="font-serif">First Name</label>
                    <input type='text' className='w-1/2 border border-gray-300 px-4 py-2' value={firstName} onChange={handleFirstNameChange}/>

                    <label className="font-serif">Last Name</label>
                    <input type='text' className='w-1/2 border border-gray-300 px-4 py-2' value={lastName} onChange={handleLastNameChange}/>
                    
                    <button className=' w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4' onClick={handleNext}>Next</button></div>
                </div>)}

                {/* Second Question 2 or 4 wheeler */}
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
                <button className='w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4' onClick={handleWheelNextPage}>Next</button>
              </FormControl>
             )}
       {/* Third question asking for type of vehicle  */}
        {typeofVehiclePage && (
    <div>
      {/* For two-wheeler */}

        {twoWheeler ?         
           <div>
              <div>                  
                <label className="font-bold  ">Select type of vehicle</label>

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
      <button className='w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4' onClick={handleVehicleSelection}>Next</button>)}

      
      <div>
      {/* fourth  question specifying which model user prefers   */}

      {vehicleModel &&(
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Model</FormLabel>
                
                <RadioGroup
                  aria-label="selectmodel"
                  name="modelselection"               
                  onChange={handlemodelChange}
                >
                  <FormControlLabel value={vehicleType.value} control={<Radio />} label={vehicleType.value} />
                 </RadioGroup>
                <button className='w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4'onClick={handleDatePage}>Next</button>
              </FormControl>)}
        </div>
    </div>
    </div>
    
        :  
        <div>
        
         {/* For two-wheeler */}
        

        <div>
          
                        <div>
                       
       <label className='font-bold '>Select type of vehicle</label>

      

    {/* which type of four wheeler */}
        {fourWheelerOptions.map((option, index) => (
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
      <button className='w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4' onClick={handleVehicleSelection}>Next</button>)}

      
      <div>
      {/*Specific model of vehicle   */}
      {vehicleModel &&(
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Model</FormLabel>
                <RadioGroup
                  aria-label="selectmodel"
                  name="modelselection"                  
                  onChange={handlemodelChange}
                >
                  <FormControlLabel value={vehicleType.value} control={<Radio />} label={vehicleType.value} />
     
                </RadioGroup>
                <button className='w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4' onClick={handleDatePage}>Next</button>
              </FormControl>)}
        </div>
    </div>
    </div>
    
    </div>}
    </div>
  )}

    {/* fifth question date selection */}
      {datePage && (
    <div>
      <StaticDatePicker
      label="Select Date"
      selected={date}
      onChange={handleDateChange}
      dateFormat="yyyy/dd/mm"
/>
    <div>
      <button className='w-1/2 bg-grey-250 hover:bg-blue-450 text-white font-bold py-2 px-4' onClick={book}>Book</button></div></div>
  )}
       </div>            
        </div>        
    )
}
export default Form;