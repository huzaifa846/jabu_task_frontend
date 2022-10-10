import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import TaskCard from '../Card'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { utils } from '../../Strings'
import { reactLocalStorage } from 'reactjs-localstorage'
import "../Home/index.css"
 
function TaskList (props) {
  const [apiToken, setApiToken] = useState('')

  useEffect(() => {
    getApiToken()
  })

  const getApiToken = async () => {
    let token = await reactLocalStorage.get('api_token')
    setApiToken(token)
  }

  const handleMarkComplete = async (taskId) => {
    let res = await axios.put(
      utils.BaseUrl +'/update?task_id='+ taskId + '&api_token=' + apiToken,
      { completed: true },
      utils.httpHeaders
    )
    return res.data.task
  }

  return (
    <Container>
       <Card.Title className="colouredbg p-2 text-white">
       <h4>Your {props.task_genre} Tasks ({props.tasks.length}) </h4>

       </Card.Title>
       
          {props.tasks.map((task, id) => (
            <TaskCard key={id} task={task} handleMarkComplete={handleMarkComplete}/>
          ))}
     
      
    </Container>
  )
}

export default TaskList
