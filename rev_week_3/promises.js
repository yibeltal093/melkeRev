/*Promises are a fundamental part of asyncronous operation in js
They help to simplify asynchronous coding, allowing us to work with the results
of an operation once it's complete of handle errors that may occur duiring operation

*/

const myPromise = new Promise((resolve, reject)=>{
    try{
        //asyncronous operation here
        let data = "Success";
        //throw new Error("Error: ");
        resolve(data);
    }catch(err){
        reject(err);
    }
})

myPromise
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));

//console.log("Continuing ..");

/*
    Promises take two function arguments, resolve and reject
    We call resolve when the async operation is successful
    We call reject when it ancounters an error.

    Promise States
    =>Pending: is an initial state, before the promise is resolved or rejected
    =>Fulfiled(Resolved): when the state is successfully resolved
    =>Rejected :when the promise is rejected, indicating an error has occured
*/

//Operations that request data
//Operations that process data
//Operations that print data
//This will be in asyncronous order


// const requestPromise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         const data = [1,2,3,4,5];
//     })
// })

// const processPromise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve(data.filter((item)=>item%2 == 0));
//     }, 1000)
// })