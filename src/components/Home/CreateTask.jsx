import React from "react";
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage'
import "./index.css"

// react-bootstrap components
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";
import { utils } from '../../Strings'

class CreateTask extends React.Component {

 

    constructor() {
        super();
        this.state = {
            title: "",
            token: "",
            decription: "",
            startDate: "",
            endDate: "",
            selectedType: "",
            iterationType: "",
            repeatCount: "",
            cycles: []
        };
        this.onChangeType = this.onChangeType.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
    }
    componentDidMount() {
        this.getApiToken();
    }
    
       getApiToken = async () => {
        let token = await reactLocalStorage.get('api_token')
        this.setApiToken(token)
      }
      setApiToken(api_token){
        this.setState({ token: api_token });


      }

     handleSubmit = async (e) =>{

        e.preventDefault();
        const data = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.selectedType,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            repeat_count: this.state.repeatCount,
            interval_type: this.state.iterationType,
            cycles: this.state.cycles,
            api_token : this.state.token
        }
        const response = await axios.post(
            'http://127.0.0.1:8000/api/create/task/',
           data
          )
      }
    onChangeType(event) {
        var val = event.target.value;
        this.setState({ selectedType: val });

    }
    onChangeIterationType(event) {
        var val = event.target.value;
        this.setState({ iterationType: val });

    }
    handleWeekDays(event) {
        event.persist()
        if (this.state.selectedType == 'weekly') {
            if (event.target.checked) this.state.cycles.push(event.target.value)
            else {
                this.state.cycles.splice(this.state.cycles.indexOf(event.target.value), 1)
            }
        }
        this.setState({});

    }
    handleTitle(event) {
        this.setState({ title: event.target.value })
    }
    handleDescription(event) {
        this.setState({ description: event.target.value })
    }
    handleStartDate(event) {
        this.setState({ startDate: event.target.value })
    }
     handleEndDate(event) {
        this.setState({ endDate: event.target.value })
    }
    handleRepeatCount(event) {
        this.setState({ repeatCount: event.target.value })
    }
     handleMonthDate (e) {
        e.persist()
        this.state.cycles[0] = e.target.value
      }
     handleMonth ( e ){
        e.persist()
        this.state.cycles[1] = e.target.value
        
      }
    render() {

        var dates = [];
        for (var i = 1; i <= 31; i++) {
            dates.push(<option value={i}  >{i}</option>);
        } var months = [];
        for (var i = 1; i <= 12; i++) {
            months.push(<option value={i}  >{i}</option>);
        }

        const { selectedType, iterationType } = this.state;
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card>
                                <Card.Header className="colouredbg text-white">
                                    <Card.Title  as="h4">Create a New Task</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Row>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Title</label>
                                                    <Form.Control
                                                        placeholder="Title"
                                                        type="text"
                                                        onChange={this.handleTitle.bind(this)}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Description</label>
                                                    <Form.Control
                                                        placeholder="Description"
                                                        type="text"
                                                        onChange={this.handleDescription.bind(this)}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col className="pr-1" md="6">
                                                <Form.Group>
                                                    <label>Task Iteration Type</label>
                                                    <Form.Control
                                                        as="select"
                                                        defaultValue=""
                                                        onChange={this.onChangeType.bind(this)}
                                                        custom
                                                    >
                                                        <option selected  >Select one</option>
                                                        <option value="daily">Daily</option>
                                                        <option value="weekly">Weekly</option>
                                                        <option value="monthly">Monthly</option>
                                                        <option value="yearly">Yearly</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        {selectedType == "weekly" ?
                                            (
                                                <Row className="mt-3">
                                                        <label>Select Week Days</label>

                                                    {utils.days.map((day, index) => (
                                                        <Col key={index}>
                                                            <div key={`${day}-checkbox`} >
                                                                <Form.Check
                                                                    key={index}
                                                                    type='checkbox'
                                                                    id={`${day}-checkbox`}
                                                                    label={`${day}`}
                                                                    value={index + 1}
                                                                    onChange={this.handleWeekDays.bind(this)}
                                                                />
                                                            </div>
                                                        </Col>
                                                    ))}

                                                </Row>
                                            ) : selectedType == "monthly" ? (<Row>
                                                <Col className="pr-1 pt-2" md="6">
                                                    <Form.Group>
                                                        <label>Select Month Date</label>
                                                        <Form.Control
                                                            as="select"
                                                            defaultValue=""
                                                            onChange={this.handleMonthDate.bind(this)}
                                                            custom
                                                        >
                                                            {dates}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>) : selectedType == "yearly" ? (<Row>
                                                <Col className="pr-1 pt-2" md="6">
                                                    <Form.Group>
                                                        <label>Select Month </label>
                                                        <Form.Control
                                                            as="select"
                                                            defaultValue=""
                                                            onChange={this.handleMonth.bind(this)}
                                                            custom
                                                        >
                                                            {months}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="pr-1 pt-2" md="6">
                                                    <Form.Group>
                                                        <label>Select Month Date</label>
                                                        <Form.Control
                                                            as="select"
                                                            defaultValue=""
                                                            onChange={this.handleMonthDate.bind(this)}
                                                            custom
                                                        >
                                                            {dates}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>) : (<Row></Row>)
                                        }
                                        <Row>
                                            <Col className="pr-1 pt-2" md="5">
                                                <Form.Group>
                                                    <label>Set Task Repetition Type</label>
                                                    <Form.Control
                                                        as="select"
                                                        defaultValue=""
                                                        onChange={this.onChangeIterationType.bind(this)}
                                                        custom
                                                    >
                                                        <option selected  >Select one</option>
                                                        <option value="date">Date</option>
                                                        <option value="repetetion">Iterations</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        {iterationType == "date" ?
                                            (
                                                <Row>
                                                    <Col className="pr-1 pt-2" md="5">
                                                        <Form.Group controlId="dob">
                                                            <Form.Label>Start Date</Form.Label>
                                                            <Form.Control type="date" name="startDate" onChange={this.handleStartDate.bind(this)} placeholder="Date of Birth" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="pr-1 pt-2" md="5">
                                                        <Form.Group controlId="dob">
                                                            <Form.Label>End Date</Form.Label>
                                                            <Form.Control type="date" name="dob" onChange={this.handleEndDate.bind(this)} placeholder="Date of Birth" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            ) : iterationType == "repetetion" ? (<Row>
                                                <Col className="pr-1" md="5">
                                                    <Form.Group>
                                                        <label>No of Repetitions</label>
                                                        <Form.Control
                                                            placeholder="no of repetetions"
                                                            type="number"
                                                            onChange={this.handleRepeatCount.bind(this)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Col>
                                            </Row>) : (<Row></Row>)}

                                        <Button
                                            className="btn-fill pull-right m-3 colouredbg text-white"
                                            type="submit"
                                            onClick={this.handleSubmit.bind(this)}
                                            variant="info"
                                        >
                                            Add Task
                                        </Button>
                                        <div className="clearfix"></div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </>
        );
    }

}


export default CreateTask;


