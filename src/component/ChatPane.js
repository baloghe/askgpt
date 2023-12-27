import React, { useState, useEffect } from "react";

export default function ChatPane({actMessages, sendNewMessage, chatState}){
	const [userMsg, setUserMsg] = useState('');

	const sendMessage = e => {
		e.preventDefault();
		e.target.reset();
		const mev = {
			message: userMsg,
			sender: 'user'
		};
		sendNewMessage(mev); //so we go back to App with our local variable
		console.log(`ChatPane :: Msg sent: ${userMsg}`);
	};
	
	return (
		<div>
			{actMessages.map((m,i)=>(<p key={i}><b>{m.sender}:</b>{m.message}</p>))}
			{chatState==='WAIT' ? <p>Waiting for answer...</p>
				:<form onSubmit={sendMessage}>
					<input type="text" onChange={e => setUserMsg(e.currentTarget.value)} required />
					<button type="submit">Go</button>
				 </form>
			}
		</div>
	);
}