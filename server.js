// initializing installed dependencies
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: path.resolve(__dirname, './.env')});
const { OpenAI } = require('openai');
const axios = require('axios');
const cors = require('cors');

// defining the server port
const port			= process.env.REACT_APP_BACKEND_PORT;
const ChatGPT_Key	= process.env.REACT_APP_CHATGPT_KEY;

const app = express();
app.use(bodyParser.json());
app.use(cors());

//ChatGPT config
const openai = new OpenAI({
  apiKey: ChatGPT_Key
});

// listening for port
app.listen(port, ()=> console.log(`Server is running on port ${port}` ));

// API request for ChatGPT
app.post("/cgpt", async (req, res) => {
  const {messages, settings} = req.body;
  
  //console.log(`server :: req`);
  //console.log(req.body);

  const completion = await openai.chat.completions.create({
    model: 		settings.model,
    max_tokens: 512,
    temperature:settings.temperature,
    messages: 	messages
  });
  
  /*
  console.log(`completion ::`);
  console.log(completion);
  console.log(completion.choices[0].message);
  */
  
  //res.send(`Good morning cgpt`);
  res.send(completion.choices[0].message.content);
});

// API request for testing
app.post("/post", async (req, res) => {
  
  console.log(`server :: req.body`);
  console.log(req.body);
  
  res.send(`Good morning`);
});
