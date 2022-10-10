import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

const TaskCard = (props) =>  {
    const [task, setTask] = useState(props.task);

    const handleClick = async () =>  {
      let newTask = await props.handleMarkComplete(task.id)
      setTask(newTask)
    }

    return (
        <Card className="my-2">
          <Card.Body>
            <h2>{task.title}</h2>
          <Badge bg={`${task.completed ? 'success':'danger'}`}>{ task.completed ? 'Completed' : 'Not completed '}</Badge>{' '}
            <Card.Text>
              <span><h6>Description : {task.description}</ h6></span> 
                
                <br></br>
              Task Type : {task.type} basis.
            </Card.Text>
            { task.completed ? "" : <Button variant="primary" onClick={handleClick}>Mark as Complete</Button>}
          </Card.Body>
        </Card>
    );
}

export default TaskCard