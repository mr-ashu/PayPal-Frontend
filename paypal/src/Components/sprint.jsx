import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CreateSprint } from './createSprint'
import "./dashboard.css"
import { PhoneIcon, AddIcon, WarningIcon, ArrowUpDownIcon } from '@chakra-ui/icons'
import { Dashboard } from './Dashboard'
import { Create } from './createtask'
export const Sprint = () => {

    const [sprint,setSprint]=useState([])
    const [sprinttask,setsprinttask]=useState([])
    const [sprintid,setid]=useState("")
    useEffect(()=>{
      axios.get(`http://localhost:8080/sprint`)
      .then((res)=>{
        setSprint(res.data)
        
      })
    },[])

    const handletask=(id)=>{
     setid(id)
 
      axios.get(`http://localhost:8080/sprint/${id}/tasks`)
      .then((res)=>{
        console.log(res.data);
        setsprinttask(res.data)
      })
     
    }

    
  return (
   <>
    <div className='sprint'>

{
  sprint?.map((el)=>(
    <div key={el._id} className='sprintbox' onClick={()=>handletask(el._id)}>
     <h3> {el.name}</h3>
     <h5> {el.startDate}</h5>
     <ArrowUpDownIcon/>
      <h5>{el.endDate}</h5>
    </div>
  ))
}


<CreateSprint/>

  
</div>

<Dashboard data={sprinttask}/>
<Create id={sprintid} />


   </>
  )
}
