//callbcks


function fetchData(url, callback){
    //simulate a http request

    setTimeout(()=>{
        const data = "this is fetch data";
        callback(data);
    }, 1000);
}

function processData(data){
    console.log("Processing Data: ", data);
}

fetchData("http://localhost:3000/", processData);
console.log("Main program is starting. ...") // This will print first because timeout delays 10s


//Promises

function fetchDataPromise(url){
    return new Promise((resolve, reject)=>{
        //Simulate a HTTP request
        setTimeout(()=>{
            const data = "This is a fetched data";
            resolve(data);
        }, 1000)
    })
}

fetchDataPromise("http://localhost:3000")
    .then((data)=>{
        console.log("Fetched Data", data);
    })
    .catch((err)=>{
        console.log(err);
    })
    console.log("Main program continues");