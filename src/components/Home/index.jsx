import  React from 'react'

import {Tab,NavItem,Row,Col,Nav} from 'react-bootstrap'
import CreateTask from './CreateTask'
import TaskList from '../List'
import { reactLocalStorage } from 'reactjs-localstorage'
import axios from 'axios'
import "./index.css"
import { utils } from '../../Strings'

class Home extends React.Component {
  state = {
    apiToken: '',
    tasks: {
      todayTask: [],
      nextDayTask: [],
      nextWeekTask: [],
      futureTask: []
    }
  }

  componentDidMount () {
    this.getTasks()
  }

  getApiToken = async () => {
    this.state.apiToken = await reactLocalStorage.get('api_token')
  }

  getTasks = async () => {
    console.log('asdfasdf');
    await this.getApiToken()
    let res = await axios.get(utils.BaseUrl + '?api_token=' + this.state.apiToken, utils.httpHeaders)
    console.log('res.data');
    console.log(res.data);
    this.state.tasks = res.data

    this.setState({})
  }

  render () { 
  return (
    <div className="m-5">
    <Tab.Container className="coloredTab" defaultActiveKey="create" > 
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link  eventKey="create">Create Task</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="today">Today Task</Nav.Link>
            </Nav.Item>
             <Nav.Item>
              <Nav.Link eventKey="tomorrow">Next Day Task</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="nextweek">Next Week Task</Nav.Link>
            </Nav.Item>
           <Nav.Item>
              <Nav.Link eventKey="future">Future Task</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="create">
            <CreateTask />
            </Tab.Pane>
            <Tab.Pane eventKey="today">
            <TaskList tasks={this.state.tasks.todayTask} task_genre='today'></TaskList>
            </Tab.Pane>
            <Tab.Pane eventKey="tomorrow">
            <TaskList tasks={this.state.tasks.nextDayTask}  task_genre='tomorrow'></TaskList>
            </Tab.Pane>
             <Tab.Pane eventKey="nextweek">
             <TaskList tasks={this.state.tasks.nextWeekTask}  task_genre='next week'></TaskList>
            </Tab.Pane>
            
            <Tab.Pane eventKey="future">
             <TaskList tasks={this.state.tasks.futureTask}  task_genre='future'></TaskList>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
   )
  }
}

export default Home