import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/slices/userSlice';

const Login = ()=> {


    //Classic approach would use useState example
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const user = useSelector((state: any)=>state.user);
    const dispatch = useDispatch();
    function handleSubmit(event: any){
        event.preventDefault(); //to stop the default behavior
        //console.log(state);
        dispatch(userActions.setUser(state as any))
        console.log(user);
    }

    function updateUsername(event: any){
        setState({...state, username: event.target.value});
    }

    function updatePassword(event: any){
        //setState({...state, password: event.target.value});
    }
  return (
    <>
        <div>Login</div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='username' onChange={updateUsername}/>
            <input type="text" placeholder='password' onChange={updatePassword}/>
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default Login