import React, { useEffect, useState } from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(r => {
      setRepositories(r.data)
    })
  }, [])
  async function handleAddRepository() {
    const result = await api.post('/repositories', {
      title: 'From Front-End',
      url: 'http://localhost',
      techs: 'PHP'
    })

    const repository = result.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete('/repositories/' + id)
    setRepositories(repositories.filter(item => item.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r =>
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
