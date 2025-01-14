import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGetDocuments } from '../hooks/document-socket';
import { getDocumentContent, updateDocumentContent } from '../utils/document-calls';

function HomeScreen() {
    const {docs, setDocs, ws} =  useGetDocuments(1);

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else {
            getDocumentContent(setDocs, "1");
        };
     }, []);

    return (
        <>
        <Container>
        <div>
            <p>{docs?.content}</p>
            <textarea 
            className={"first"}
            value={docs?.content}
            onChange={e => updateDocumentContent(ws, "1", e.target.value)}
            rows={10} 
            cols={50}
            wrap="off"
        />  
        <Row>
            <Col>Not register? <Link to="/login"> login </Link></Col>
        </Row>    
        </div>
        </Container>
        </>
    )
}

export default HomeScreen