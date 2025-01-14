import { Container, Row, Col } from 'react-bootstrap';
import { SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGetDocuments } from '../hooks/document-socket';
import { DocType, getDocumentContent, updateDocumentContent } from '../utils/document-calls';
import axios from "axios";

const Item = (doc: DocType ) => {
  return <li>{doc.id}</li>
}

function HomeScreen() {
    const [docs, setDocs] = useState<DocType[]>([]);
    const items = [];

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
          axios.get(`http://localhost:8000/documents/`, { headers })
            .then((response: { data: SetStateAction<DocType[]>; }) => {
              setDocs(response.data);
          })
        };
     }, []);

    return (
        <>
        <Container>
        <div>
          <ul>
            {docs.map((doc) => {
              const url = `/document/${doc.id}`;
              return <li><Link to={url}>{doc.title}</Link></li>
            }
                
            )}
          </ul>
          <Row>
            <Col>Not register? <Link to="/login"> login </Link></Col>
          </Row>    
        </div>
        </Container>
        </>
    )
}

export default HomeScreen