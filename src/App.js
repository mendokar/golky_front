import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Navbar, Container, Form, Row, Col } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', totalReactPackages: [] };
    this.people = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
        fetch('https://golky-back.herokuapp.com/api/v1/sendParam/'+this.state.value)
        .then(response => response.json())
        .then(data => {console.log(data)          
          this.people.push(data.response.data.text);
          this.setState({ totalReactPackages: this.people })          
        });        
        event.preventDefault();
  }

  render() {
    return (
      <>
        <Navbar bg="danger" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://www.golky.co/_next/static/images/golkyNav-376cfcd4e5a331b6966eb99074eea527.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Golky Test
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col className="mb-12">
                <Form.Group >
                <Form.Label>Palabra de Prueba</Form.Label>
                <Form.Control type="text" placeholder="Test" value={this.state.value} onChange={this.handleChange} />
                <Form.Text className="text-muted">
                  Por favor ingresa una palabra de prueba
                </Form.Text>
              </Form.Group>
              </Col>              
              <Col className="mb-12">                           
              <br />
                <Form.Group >
                  <Button  type="submit" value="Submit" variant="outline-primary">
                    Send
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <hr />
          <div>
          <h4>Resultados</h4>
          {this.state.totalReactPackages.map((value, index) => (
            <>                        
            <Form.Control type="text" placeholder="Test" value={value} onChange={this.handleChange} />
            <br />
            </>                                     
          ))}
    </div>
        </Container>

      </>
    );
  }
}

export default App;
