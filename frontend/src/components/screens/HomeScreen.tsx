import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link, } from 'react-router-dom';
import axios from "axios";
import { DocType, getDocumentsList, createDocumentContent } from '../utils/document-calls';


function HomeScreen() {
    const [docs, setDocs] = useState<DocType[]>();
    const [title, setTitle] = useState("")

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
          window.location.href = '/login'
        }
        else {
          const fetchData = async () => {
            const {data} =  await axios.post('http://localhost:8000/api/token/refresh/', {
              refresh: localStorage.getItem('refresh_token')
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept' : 'application/json',
                  'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
              },
            );
            axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
            localStorage.setItem('access_token', data.access);
          }
          // call the function
          fetchData()
            // make sure to catch any error
            .catch(console.error);
          getDocumentsList(setDocs);
        };
     }, []);

    const submitCreateDoc = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createDocumentContent(title, setDocs);
      setTitle('');
    }

    return (
      <>
      <Container>
        <div>
          <h2>Documents list </h2>
          <ul>
            {docs?.map((doc) => {
              const url = `/document/${doc.id}`;
              return <li key={doc.id}><Link to={url}>{doc.title}</Link></li>
            }
            )}
          </ul>
          <br/>
          <h2>Create new document</h2>
          <Form onSubmit={submitCreateDoc}>
              <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                      type="text" 
                      placeholder="Add title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      required
                  />
              </Form.Group>
              <br />
              <div>
                  <Button type='submit'> Create doc </Button>
              </div>  
          </Form>
          <Row>
            <Col>Not register? <Link to="/login"> login </Link></Col>
          </Row>    
        </div>
      </Container>
      </>
    )
}

export default HomeScreen