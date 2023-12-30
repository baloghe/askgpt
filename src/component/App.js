import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPane from "./LoginPane.js";
import SettingsPane from "./SettingsPane.js";
import ChatPane from "./ChatPane.js";

const Backend_Url	= process.env.REACT_APP_BACKEND_URL;
const Backend_Port	= process.env.REACT_APP_BACKEND_PORT;
const ChatGPT_Key	= null; //needed for askLLM_fromFrontend but would expose key in static/bundle.js

export default function App({preSet}){
	const [settings, setSettings] = useState(preSet);
	const [messages, setMessages] = useState([]);
	const [state, setState] = useState('LOGIN');//LOGIN
	const [chatState, setChatState] = useState('TYPE');
	
	const HTTP_CGPT = `${Backend_Url}:${Backend_Port}/cgpt`;
  
	let timerID = null;
	let newMsgs = null;
  
	const changeSettings = d => {
		console.log(`App :: settings changed`);
		setState('CHAT');
	};
	
	const loginDone = () => {
		console.log(`App :: login successful`);
		setState('SETTINGS');
	};
	
	async function askLLM (allMessages) {
		/* ChatGPT */
		const apiMsg = allMessages.map(m=>{
			return { role: m.sender==="user" ? "user" : "assistant"
			        ,content: m.message};
		});
		const request = {
				"messages": [
							{"role": "system", "content": settings.ChatGPT.systemMessage},
							...apiMsg
							],
				"settings": {model: settings.ChatGPT.model, temperature: settings.ChatGPT.temperature}
		};
		
		console.log(`HTTP_CGPT = ${HTTP_CGPT}`);
		/*
		console.log(`request = ${request}`);
		*/
		axios
		.post(`${HTTP_CGPT}`, request)
		.then((data) => {
			//console.log('Received ::');
			//console.log(data);
			setMessages([...allMessages, {
				message: data.data,               //here we get back the text only
				sender: "ChatGPT"
			}]);
		});
		
	};
	
	async function askLLM_fromFrontend (allMessages) {
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
	
	return (state==='LOGIN'
			?<LoginPane loginSuccess={loginDone} />
			:(state==='SETTINGS'
				? <SettingsPane actSettings={settings} changeSettings={changeSettings} />
				: <ChatPane actMessages={messages} sendNewMessage={sendNewMessage} chatState={chatState} />
				)
			);
  
}