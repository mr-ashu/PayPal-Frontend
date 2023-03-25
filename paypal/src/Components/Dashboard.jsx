import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { Create } from './createtask'
import "./dashboard.css"
import { Sprint } from './sprint'
export const Dashboard = (data) => {
 
  console.log(data);
 
  return (
   
  
  
    <div >
       
      <div className='dashboard'>
      <div>
           <h3>Todo</h3>
        
       </div>
       <div>
        <h3>In Progress</h3>
        
       </div>
       <div>
         <h3>Done</h3>
      
       </div>
      </div>

      
      
       

    </div>

  
  )
}
