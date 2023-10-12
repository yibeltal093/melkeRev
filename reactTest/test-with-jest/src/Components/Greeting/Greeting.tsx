import React, { useState } from 'react'
import Output from './Output/Output';

function Greeting() {
    let [changedText, setChangedText] = useState(false);
    function changeTextHandler() {
        console.log("Clicked");
        setChangedText(!changedText);
    }

  return (
    <div>
        <h2>Hello World</h2>
        {!changedText && <Output text="Nice to meet you"/>}
        {changedText && <Output text = "I have been changed"/>}
        <button onClick={changeTextHandler}>Change text</button>
    </div>
  )
}

export default Greeting