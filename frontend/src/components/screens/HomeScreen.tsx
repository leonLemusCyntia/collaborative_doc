import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link, } from 'react-router-dom';
import { DocType, getDocumentsList, createDocumentContent } from '../utils/document-calls';


function HomeScreen() {
    const [docs, setDocs] = useState<DocType[]>();
    const [title, setTitle] = useState("")

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
          window.location.href = '/login'
        }
        else {
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
          <ul>
            {docs?.map((doc) => {
              const url = `/document/${doc.id}`;
              return <li key={doc.id}><Link to={url}>{doc.title}</Link></li>
            }
            )}
          </ul>
          <br/>
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