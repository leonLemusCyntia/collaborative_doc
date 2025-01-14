import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { DocType } from "../utils/document-calls";

type DocumentCollaborationProps = {
    documentId?: string,
    updateCallback: (documentId: string) => void,
}

export function useDocumentsEvents({
    documentId,
    updateCallback,
}: DocumentCollaborationProps) {
    const [ws, setWs] = useState<WebSocket | null>(null);
  
    useEffect(() => {
      if (!documentId) {
        return;
      }
      const websocket_url = "ws://localhost:8000/";
      if (ws === null) {
        const socket = new WebSocket(
          websocket_url + `ws/doc/${documentId}`,
        );
        setWs(socket);
      }
    }, [documentId, ws, updateCallback]);
  
    useMemo(() => {
      if (!ws) {
        return ws;
      }
      ws.onmessage = (event) => {
        updateCallback(documentId ?? '');
      };
    }, [ws]);

    return useMemo(() => {
        return {
          ws
        };
      }, [ws]);
}

export function useGetDocuments(documentId: string) {
    const [docs, setDocs] = useState<DocType>();
    const {ws} = useDocumentsEvents({
        documentId: documentId,
        updateCallback(documentId) {
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
    })
    return useMemo(() => {
        return {
          docs, setDocs, ws,
        };
      }, [docs, setDocs, ws]);
}
