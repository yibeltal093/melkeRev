

import React, {useEffect, useState} from 'react';
import {Pokemon} from './Pokemon';
import './Hooks.css';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../redux/counterSlice';
function Hook(){

    //Redux with counter 
    //First to reference the global store using useSlector
    //This lets use see the value in the global store
    //HOW TO CREATE REACT APP: ===> [npx create-react-app reduxdemo --template typescript]

    let counter = useSelector((state: any)=>state.counter.value);

    let dispatcher = useDispatch();


    let [state, setState] = useState({
        visibility: false,
        counter: 0
    });

    let [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon)

    useEffect(()=>{
        async function getDitto(){
            let response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
            let responseBody = await response.json();

            console.log(responseBody);
            setPokemon(responseBody);
        }
        getDitto();
    }, []);

    function toggleButton(){
        console.log("Toggle function triggered");
        setState({...state, visibility: !state.visibility});
    }

    // function decreament(){
    //     setState({...state, counter: state.counter-1});
    // }

    // function increament(){
    //     setState({...state, counter: state.counter+1});
    // }

    function increament(){
        //setState({...state, counter: state.counter-1});
        dispatcher(counterActions.increament());
    }

    function decreament(){
        //setState({...state, counter: state.counter+1});
        dispatcher(counterActions.decreament());
    }

    //let [Pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
    return (
        <>
        <button onClick={toggleButton}>Toggle</button>

        {
            state.visibility ? <h2> Am I visible?</h2>: <></>
        }
        <div className='buttonDiv'>
        <button onClick={increament}><h1>+</h1></button>
        <button onClick={decreament}><h1>-</h1></button>
        </div>

        {/* <h1>{state.counter}</h1> */}
        <h1>{counter}</h1>
    
    {
        pokemon.abilities ? pokemon.abilities.map((obj, index)=>{
            return (
                <h3 key={index}>{obj.ability.name}</h3>
            )
        }): <></>
    }
    </>
    )
}
export default Hook