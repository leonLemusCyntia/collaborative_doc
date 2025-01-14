import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useGetDocuments } from '../hooks/document-socket';
import { getDocumentContent, updateDocumentContent } from '../utils/document-calls';

function DocumentScreen() {
    const { documentId } = useParams();
    const {docs, setDocs, ws} =  useGetDocuments(documentId ?? '');

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else {
            console.log("here is de document "  + documentId);
            getDocumentContent(setDocs, documentId ?? '');
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
            onChange={e => updateDocumentContent(ws, documentId ?? '', docs?.title ?? '', e.target.value)}
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

export default DocumentScreen