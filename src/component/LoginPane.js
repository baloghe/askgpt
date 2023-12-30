import React, { useState, useEffect } from "react";
import sha256 from 'sha256';

const ENCRYPTED_USER	= process.env.REACT_APP_ENCRYPTED_USER;
const ENCRYPTED_PW	= process.env.REACT_APP_ENCRYPTED_PW;

export default function LoginPane({loginSuccess}){
	const [state, setState] = useState('ENTER');
	const [user, setUser] = useState('');
	const [pw, setPW] = useState('');

	const login = (e) => {
		e.preventDefault();
		
		let encUser=sha256(user);
		let encPw=sha256(pw);
		
		if(encUser===ENCRYPTED_USER && encPw===ENCRYPTED_PW){
			setState('OK');
			loginSuccess();
		} else {
			setState('ERROR');
		}
	};

	return (
  	<div>
    <h2>Log in</h2>
	<form onSubmit={login}>
		<label htmlFor="user">User: </label>
		<input type="text" name="user" onChange={e => setUser(e.currentTarget.value)} required />
		<label htmlFor="pw">Password: </label>
		<input name="pw" type="password" onChange={e => setPW(e.currentTarget.value)} required />
		<button onClick={login}>Submit</button>
	</form>
	{state==='ENTER'
		? <p></p>
		: state==='ERROR'
			? <p>Wrong user or password!</p>
			: <p>Login successful</p>
	}
    </div>
  );
}