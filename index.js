// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import ollama from 'ollama';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
app.get('/chat', (req, res) => {
  res.send('Chat endpoint is working!');
})
app.post('/chat', async (req, res) => {
  // Print entire body for debugging (remove in production)
  console.log('Received req.body:', req.body);

  const userMessage = req.body.message;
  console.log('Extracted userMessage:', userMessage);
  if (!userMessage) {
    return res.status(400).json({ error: 'Missing message in request body', body: req.body });
  }
  try {
    const response = await ollama.chat({
      model: 'llama3', // or your preferred Ollama model
      messages: [{ role: 'user', content: userMessage }],
    });
    res.json({ reply: response.message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

