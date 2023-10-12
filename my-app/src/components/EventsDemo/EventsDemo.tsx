
import React from 'react'
function EventDemo(){

    function clickEventTriggered(){
        console.log("Click event triggered");
    }

    function hoverEventTriggered(){
        console.log("Hover event Triggered");
    }

    function inputChanged(event: React.ChangeEvent<HTMLInputElement>){
        console.log("Input Changed");
        console.log("event.target.value");
    }

    return (
        <>
        <button onClick={clickEventTriggered}>Click Event</button>
        <button onMouseOver={hoverEventTriggered}>Hover Event</button>
        <input type="text" placeholder="Username" onChange={inputChanged}/>
        
        Hello events</>
    )
}
export default EventDemo