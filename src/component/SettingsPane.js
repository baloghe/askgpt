import React, { useState, useEffect } from "react";

export default function SettingsPane({actSettings, changeSettings}){
	const [settings, setSettings] = useState(actSettings);

	const submitChange = () => {
		//console.log(`SettingsPane :: settings submitted: ${JSON.stringify(settings)}`);
		changeSettings(settings);
	};
	
	const copySettings = (s) => {
		let ret = {};
		for(let k1 in s){
			let act = {};
			for(let k2 in s[k1]){
				act[k2] = s[k1][k2];
			}
			ret[k1] = act;
		}
		return ret;
	};
	
	const valueChanged = (target, newV) => {
		let n = copySettings(settings);
		let k1 = target.getAttribute("data-aikey");
		let k2 = target.getAttribute("data-stkey");
		n[k1][k2] = newV;
		//console.log(`${k1}.${k2} := ${newV}`);
		setSettings(n);
	};

	return (
  	<div>
    <h2>Settings</h2>
	<ul>
	{Object.entries(settings).map(([k1,v1])=>{
		return (<li key={k1}>{k1}:{
			<ol>
			{Object.entries(v1).map(([k2,v2])=>{
			return (<li key={"IN-"+k1+"-"+k2}>{k2}:
				<input type="text" 
						data-aikey={k1}
						data-stkey={k2}
						value={v2}
						onChange={e => valueChanged(e.currentTarget, e.currentTarget.value)} />
			</li>)
		})}
			</ol>
		}</li>);
	})}
	</ul>
	<button onClick={submitChange}>Submit</button>
    </div>
  );
}