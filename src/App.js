import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    api.post('/repositories', {
      title: `ReactJs ${Date.now()}`,
      url: "https://github.com/Marcos-Toledo/gostack-template-conceitos-reactjs"
    }).then((repository) => {
      setRepositories([...repositories, repository.data]);
      console.log('Repositorio adicionado com sucesso');
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id)
      
      repositories.splice(repositoryIndex, 1);
      
      setRepositories([...repositories]);
      console.log('Repositorio removido com sucesso');
    });
  }

  useEffect(() => {
    api.get('/repositories').then((repositories) => {
      setRepositories(repositories.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
