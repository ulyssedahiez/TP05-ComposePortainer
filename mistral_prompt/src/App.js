import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://gprrrr.co/ollama/api/generate",
        {
          model: "mistral",
          prompt: question,
          stream: false,
        }
      );
      setAnswer(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Ulysse & Mael</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Posez une question :
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
      {loading && <div className="loading">Chargement...</div>}
      {answer && !loading && <div className="response">Réponse : {answer}</div>}
    </div>
  );
}

export default App;
