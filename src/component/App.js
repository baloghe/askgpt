import React, { useState, useEffect } from "react";
import SettingsPane from "./SettingsPane.js";
import ChatPane from "./ChatPane.js";

const ChatGPT_Key=process.env.REACT_APP_CHATGPT_KEY;

export default function App({preSet}){
	const [settings, setSettings] = useState(preSet);
	const [messages, setMessages] = useState([]);
	const [state, setState] = useState('SETTINGS');
	const [chatState, setChatState] = useState('TYPE');
  
	let timerID = null;
	let newMsgs = null;
  
	const changeSettings = d => {
		console.log(`App :: settings changed`);
		setState('CHAT');
	};
	
	async function askLLM (allMessages) {
		const apiMsg = allMessages.map(m=>{
			return { role: m.sender==="user" ? "user" : "assistant"
			        ,content: m.message};
		});
		
		const request = {
				"model": "gpt-3.5-turbo",
				"messages": [
							{"role": "system", "content": "Explain things like you're talking to a fourth grader."},
							...apiMsg
							]
		};
		
		await fetch("https://api.openai.com/v1/chat/completions",
		{
			method: "POST",
			headers: {
				"Authorization": "Bearer " + ChatGPT_Key,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(request)
		}).then((data) => {
			return data.json();
		}).then((data) => {
			setMessages([...allMessages, {
				message: data.choices[0].message.content,
				sender: "ChatGPT"
			}]);
		});
	};
	
	const sendNewMessage = async (msg) => {
		newMsgs = [...messages, msg];
		setMessages(newMsgs);
		console.log('Ask some GPT');
		setChatState('WAIT');
		await askLLM(newMsgs); ////stop here until we get an answer
		setChatState('TYPE');
	};
	
	return (state==='SETTINGS'
			? <SettingsPane changeSettings={changeSettings} />
			: <ChatPane actMessages={messages} sendNewMessage={sendNewMessage} chatState={chatState} />
			);
  
}