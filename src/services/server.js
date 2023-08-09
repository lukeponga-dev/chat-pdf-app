const express = require('express');
const cors = require('cors');
const axios = require('axios')
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { question, sourceId } = req.body;
    
    try {
      const response = await axios.post('https://api.chatpdf.com/v1/chats/message', {
        sourceId: sourceId,
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
      }, {
        headers: {
          'x-api-key': 'sec_2Tzl8BNJuILg1PHgiH6y4u6N6ALEOfsj',
        }
      });
      
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error handling chat message');
    }
  });
  
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });