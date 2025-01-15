import axios from "axios";

export type DocType = {
    id: string,
    title: string,
    content?:string
}

export function getDocumentsList(
    setDocs: React.Dispatch<React.SetStateAction<DocType[] | undefined>>,
) {
    const headers = {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
    }
    axios.get(`http://localhost:8000/documents/`, { headers })
      .then((response) => {
        setDocs(response.data);
    })
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
    title: string,
    content: string,
) {
    const url = 'http://localhost:8000/documents/' + documentId + '/'
    axios.put(url, {
        title: title,
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

export function createDocumentContent(
  title: string,
  setDocs: React.Dispatch<React.SetStateAction<DocType[] | undefined>>,
) {
  const url = 'http://localhost:8000/documents/'
  axios.post(url, {
      title: title,
      content: title, 
    },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
    .then((_) => {
      getDocumentsList(setDocs);
  })
}


