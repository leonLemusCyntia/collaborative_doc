import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import  { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
 

function SignupScreen() {
    const [uname, setUname ] = useState("")
    const [fname, setFname ] = useState("")
    const [lname, setLname ] = useState("")
    const [email, setEmail ] = useState("")
    const [pass1, setPass1 ] = useState("")
    const [pass2, setPass2 ] = useState("")
    const [error, setError ] = useState("")


    const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pass1 != pass2) {
            setError("Password do not match");
        } else {
            const user = {
                username: uname,
                email: email,
                password: pass1,
                first_name: fname,
                last_name: lname,
            }
            const {data} = await axios.post('http://localhost:8000/register/',
                user, {
                    headers: {'Content-Type': 'application/json'},
                },
            );
            window.location.href = '/'
        }
        console.log(fname, lname, email, pass1)
    }

    return (
    <>
    <Container>
        <Row>
            <Col md={4}></Col>
            <Col md={4}>
                <Card> 
                    <Card.Header as="h1" >
                        Signup
                    </Card.Header>
                </Card>
                <Card.Body>
                    {error && <Message variant='danger'>{error}</Message>}
                    <br />
                    <Form onSubmit={submitSignup}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your Username" 
                                value={uname} onChange={(e) => setUname(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your First Name" 
                                value={fname} onChange={(e) => setFname(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3" controlId="lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your Last Name" 
                                value={lname} onChange={(e) => setLname(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <br />
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your Email" 
                                value={email} onChange={(e) => setEmail(e.target.value)} 
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
                        <Form.Group className="mb-3" controlId="pass2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Confirm Password" 
                                value={pass2} onChange={(e) => setPass2(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <div>
                            <Button type='submit'> Signup</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Col>
            <Col md={4}></Col>
        </Row>
    </Container>
    </>
  )
}

export default SignupScreen