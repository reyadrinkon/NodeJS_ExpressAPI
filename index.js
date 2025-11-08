// index.js
import express from 'express';
import ollama from 'ollama';

const app = express();
const PORT = 3000;

// Native JSON parser middleware; must be registered first!
app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('Hello, World 2!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
