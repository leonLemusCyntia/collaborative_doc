import { Container, Row, Col } from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import  { useDispatch, useSelector } from 'react-redux';

type DocType= {
    content?:string
}

function HomeScreen() {
    const [message, setMessage] = useState('Hello, World');
    const [docs, setDocs] = useState<DocType>();
    //const [words, setWords] = useState<string>('');


    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else {
            const headers = {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
            console.log(headers)
            setMessage(localStorage.getItem('access_token')?.toString() ?? 'no token')
            axios.get('http://localhost:8000/documents/1/', { headers })
              .then((response) => {setDocs(response.data);
            })
        };
     }, []);

    return (
        <>
        <Container>
        <div>
            <h1>{message}</h1> 
            <p>{docs?.content}</p>
            <Row>
                            <Col>
                                Not register? <Link to="/login"> login </Link>
                            </Col>
                        </Row>
            
        </div>
        </Container>
        </>
    )
}

export default HomeScreen