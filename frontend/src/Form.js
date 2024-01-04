import React from React;
function Form(){
    return(
        <div>
            <div>
                <label>First , what's your name</label>
                <div>
                    <label>First Name</label>
                    <input type='text' value={firstName}/>

                    <label>Last Name</label>
                    <input type='text' value={lastName}/>
                    
                </div>
            </div>
        </div>
    )
}