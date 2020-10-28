import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";
function App() {
  const [ repositories, setRepositories]= useState([])

  useEffect(()=>{
    api.get('/repositories').then(response=>{
    setRepositories(response.data)
    })
  },[repositories])

  async function handleAddRepository() {

  const response = await api.post('/repositories',{
    title: "Desafio node js ", 
    url: "http://github.com/...", 
    techs: ["Node.js", "..."]
  })

  const repository= response.data
   setRepositories([...repositories, repository ])
  }

  async function handleRemoveRepository(id) {
   const response = await api.delete(`/repositories/${id}`)
     const repositoryIndex = repositories.findIndex(respository=> respository.id === id)  

      repositories.splice(repositories[repositoryIndex],1)
    
     return;
    
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(respository=>{
          return(
            <li key={respository.id}>
              {respository.title}

              <button onClick={() => handleRemoveRepository(respository.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>
        
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
