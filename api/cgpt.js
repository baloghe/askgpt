const ChatGPT_Key	= process.env.REACT_APP_CHATGPT_KEY;

const { OpenAI } = require('openai');

//ChatGPT config
const openai = new OpenAI({
  apiKey: ChatGPT_Key
});

async function askAI(req, res){
	
	const {messages, settings} = req.body;
	
	const completion = await openai.chat.completions.create({
		model: 		settings.model,
		max_tokens: 512,
		temperature:settings.temperature,
		messages: 	messages
	  });
	  
	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");
	
    res.json(completion.choices[0].message.content);
}

module.exports = askAI;
