import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div>
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
      {answer && <div>Réponse : {answer}</div>}
    </div>
  );
}

export default App;
