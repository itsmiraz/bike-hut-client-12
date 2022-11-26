import { useState } from "react"
import { useEffect } from "react"


const useBuyer = email =>{
  const [isBuyer,setIsBuyer] = useState(false)
  const [isBuyerLoading,setIsBuyerLoading] = useState(true)
    useEffect(()=>{
        if(email){
            fetch(`https://bike-hut-server.vercel.app/user/buyer/${email}`)
        .then(res=>res.json())
        .then(data=>{
            setIsBuyer(data.isSeller)
            setIsBuyerLoading(false)
        })
        }
    },[email])
    return [isBuyer,isBuyerLoading];
}

export default useBuyer;