import React, { useState, useEffect } from "react";

export default function SettingsPane({actSettings, changeSettings}){
	const [settings, setSettings] = useState(actSettings);

	const submitChange = () => {
		changeSettings(settings);
	};

	return (
  	<div>
    <h2>Settings</h2>
      <button onClick={submitChange}>Submit</button>
    </div>
  );
}