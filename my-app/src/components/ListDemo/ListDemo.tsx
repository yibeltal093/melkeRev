import React from 'react';
import './ListDemo.css';
function ListDemo(){

    type Person = {
        name: string;
        age: number;
    };

    let peoples: Person[] = [
        {
            name: 'Mike',
            age: 34
        },
        {
            name: 'Jim',
            age: 30
        },
        {
            name: 'Jhon',
            age: 50
        },
        {
            name: 'Micheal',
            age: 20
        },
        {
            name: 'Bruce',
            age: 38
        }

    ]


    return (
        
        <div>{
            peoples.map((obj, index)=>{
                return (
                <div className="name-div" key={index}>
                <h1>{obj.name}</h1>
                <h1>{obj.age}</h1>
                <button>Click Me</button>
                </div>
                );
            })
        }
        </div>
    )
}
export default ListDemo