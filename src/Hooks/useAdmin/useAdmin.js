import { useState } from "react"
import { useEffect } from "react"


const useAdmin = email =>{
  const [isAdmin,setIsAdmin] = useState(false)
  const [isAdminLoading,setIsAdminLoading] = useState(true)
    useEffect(()=>{
        if(email){
            fetch(`https://bike-hut-server.vercel.app/user/admin/${email}`)
        .then(res=>res.json())
        .then(data=>{
            setIsAdmin(data.isAdmin)
            console.log(data);
            setIsAdminLoading(false)
        })
        }
    },[email])
    return [isAdmin,isAdminLoading];
}

export default useAdmin;