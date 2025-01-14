import axios from "axios";

export type DocType = {
    content?:string
}

export function getDocumentContent(
    setDocs: React.Dispatch<React.SetStateAction<DocType | undefined>>,
    documentId: string
) {
    const headers = {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
    }
    axios.get(`http://localhost:8000/documents/${documentId}/`, { headers })
      .then((response) => {
        setDocs(response.data);
    })
}

export function updateDocumentContent(
    ws: WebSocket | null,
    documentId: string,
    content: string,
) {
    const headers = {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
        'content': content,
    }
    axios
    .put('http://localhost:8000/documents/1/', {
        content: content,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
    .then((_) => {
      ws?.send(documentId)
    });
}


