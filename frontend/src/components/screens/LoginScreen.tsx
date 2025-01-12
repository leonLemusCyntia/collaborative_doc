import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import  { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';

function LoginScreen() {
    const [uname, setUname ] = useState("")
    const [pass1, setPass1 ] = useState("")
    const [error, setError ] = useState("")
    
    const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {
            username: uname,
            password: pass1,
        }
        const {data} = await  axios.post('http://localhost:8000/api/token/',
            user,{
                headers: {'Content-Type': 'application/json'},
                
            },
        );
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${data['access']}`;
        window.location.href = '/'
    }

    return (
        <>
        <Container>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Card> 
                        <Card.Header as="h1" >
                            Login
                        </Card.Header>
                    </Card>
                    <Card.Body>
                    {error && <Message variant='danger'>{error}</Message>}
                    <br />
                        <Form onSubmit={submitLogin}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your Username" 
                                    value={uname} onChange={(e) => setUname(e.target.value)} 
                                    required
                                />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-3" controlId="pass1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Password" 
                                    value={pass1} onChange={(e) => setPass1(e.target.value)} 
                                    required
                                />
                            </Form.Group>
                            <br />
                            <div>
                                <Button type='submit'> Login </Button>
                            </div>
                        </Form>
                        <Row>
                            <Col>
                                Not register? <Link to="/signup"> Sing up </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
        </>
    
      )

}

export default LoginScreen