import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    // Charger les tâches depuis le back-end
    axios
      .get("http://localhost:4000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des tâches :", error)
      );
  }, []);

  const handleAddTask = () => {
    axios
      .post("http://localhost:4000/api/tasks", { description: taskInput })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) =>
        console.error("Erreur lors de l'ajout de la tâche :", error)
      );
    setTaskInput("");
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:4000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) =>
        console.error("Erreur lors de la suppression de la tâche :", error)
      );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-do List</h1>
        <div>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Nouvelle tâche"
          />
          <button onClick={handleAddTask}>Ajouter</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.description}
              <button onClick={() => handleDeleteTask(task.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
