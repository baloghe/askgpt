import React, { useState, useEffect } from "react";
import axios from "axios";

const Backend_Url	= process.env.REACT_APP_BACKEND_URL;
const Backend_Port	= process.env.REACT_APP_BACKEND_PORT;
const ChatGPT_Key	= process.env.REACT_APP_CHATGPT_KEY;

export default function App({preSet}){
	const HTTP_CGPT = `${Backend_Url}:${Backend_Port}/cgpt`;//`${Backend_Url}:${Backend_Port}/cgpt`;//"http://localhost:8080/chat";
	const HTTP_TEST = `${Backend_Url}:${Backend_Port}/post`;

	async function test(){
		let payload = { name: 'John Doe', occupation: 'gardener' };

		let res = await axios.post(HTTP_TEST, payload);
		let data = res.data;
		console.log(data);
	};
	//test();
	
	async function cpgt(){
		let messages=[  {"role": "system", "content": "Explain things like you're talking to a fourth grader."}
					   ,{"role": "user", "content": "Why is the sky blue?" }
					   ];
		let settings={model: 'gpt-3.5-turbo', temperature: 0.2}
		let res = await axios.post(HTTP_CGPT, {"messages": messages, "settings": settings});
		let data = res.data;
		console.log(data);
	};
	//cpgt();
	
	async function cpgt2(){
		let messages=[  {"role": "system", "content": "Explain things like you're talking to a fourth grader."}
					   ,{"role": "user", "content": "Why is the sky blue?" }
					   ];
		let settings={model: 'gpt-3.5-turbo', temperature: 0.2}
		let res = await axios.post(HTTP_CGPT, {"messages": messages, "settings": settings});
		let data = res.data;
		console.log(data);
	};
	cpgt2();
	
	return (
		<div>
		<p key='1'>Hello World!</p>
		<p key='2'>HTTP_CGPT={HTTP_CGPT}</p>
		</div>
	);
}