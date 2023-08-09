# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `Project Documentation`

Sure, in order to build a website using the ChatPDF API, with React and JavaScript, you can follow the below steps:

**1. Setup a new React Application**

To start, create a new React application using create-react-app or any other method you prefer. On your terminal, run the following commands:

```bash
npx create-react-app chat-pdf-app
cd chat-pdf-app
```

**2. Create a User Interface for Chat**

In your chosen component file (for instance, `App.js`), create a simple chat interface with an input component for the user to type their questions, and an output component to display the responses.

Here's a very simple example:

```jsx
import React from 'react';

class App extends React.Component {
  state = { 
    question: '',
    responses: [],
  };

  render() {
    return (
      <div>
        <div>
          {this.state.responses.map((response, index) =>
            <li key={index}>{response}</li>
          )}
        </div>

        <input
          type="text"
          value={this.state.question} 
          onChange={event => this.setState({ question: event.target.value })} 
        />

        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default App;
```

**3. Backend Server Setup**

You should hide your sensitive information (like your API keys) on the server-side. So, in this guide, let's assume you have a Node.js server running with Express.js.

You can use `axios` to make http requests from your Node server to the ChatPDF API.

First, install `axios` with npm:

```
npm install axios
```

Then, you can set up a route in your server file (like `server.js`) to handle chat message submission:

```javascript
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
        'x-api-key': 'YOUR_CHATPDF_API_KEY',
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
```

In this example replace `'YOUR_CHATPDF_API_KEY'` with your own key. This route listens for POST requests at `/api/chat`, take the user's question and `sourceId` from body, makes a POST request to the ChatPDF API, and returns the response.

**4. Calling the Backend from the React App**

Finally, back in your React app, implement the `handleSubmit` function to make a POST request to your server when the user submits a question. Install `axios` in your React app to make the HTTP request.

```jsx
import axios from 'axios';

// Inside your component
handleSubmit = async () => {
  const response = await axios.post('http://localhost:5000/api/chat', {
    question: this.state.question,
    sourceId: 'src_xxxxxx',
  });
  
  this.setState(prevState => ({
    responses: [...prevState.responses, response.data.content],
    question: '',
  }));
};
```

Replace `'src_xxxxxx'` with your source ID. This function sends the user's question and the `sourceId` to your server, gets the response from the ChatPDF API, and adds it to the `responses` array in state.

Please note, this a very basic example and might not include best practices for error handling and scalability. Be sure to understand this code and refactor based on your requirements when you are deploying in production. Including error handling and user notification mechanisms would be essential for a production application.

Let me know if you need help on any of these steps, I'd be glad to elaborate or discuss further!
