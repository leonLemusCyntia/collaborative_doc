import axios from "axios";
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

const headers = {
  "Content-Type": "application/json",
};

type DocType= {
  content?:string
}

function App() {
  const [doc, setDoc] = useState<DocType>();
  const [words, setWords] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:8000/documents/1/', { headers })
      .then((response) => {setDoc(response.data);})
    })

  function updateDocument(content: string) {
      setWords(content)
      axios
        .put('http://localhost:8000/documents/1/', {
          content: content,
        })
        .then((response) => {
          setDoc(response.data);
        });
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>An Awesome Blog </h1>
          <h3>On Django, React, Postgres, and Docker </h3>
          <p>{doc?.content}</p>
          
          <textarea 
            className={"first"}
            value={words}
            onChange={e => updateDocument(e.target.value)}
            rows={10}
            cols={50}
            wrap="off"
          />  
        </header>
      </div>
    );
  }

  export default App;
