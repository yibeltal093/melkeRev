
import React, { useEffect, useState } from 'react'


//use jsonplaceholder for simulating/emulating backend
function Async() {
    //adding <any[]> to make is generic and work with array objects
    //typescript doesn't work useState hook without stating generic on request
    let [posts, setPosts] = useState<any[]>([]);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response)=>response.json())
            .then((data)=>setPosts(data));
    }, []);
  return (
    <div>
        <ul>
        {
            //post.id is unique in the api
            posts.map((post)=>(<li key={post.id}>{post.title}</li>))
        }
        </ul>
    </div>
  )
}

export default Async