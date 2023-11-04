import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    breakTimes: [{ start: '', end: '' }],
    sleepTime: '',
    wakeUpTime: '',
    longTermGoals: ['']
  });

  useEffect(() => {
    M.Timepicker.init(document.querySelectorAll('.timepicker'));
    return () => {
      document.querySelectorAll('.timepicker').forEach(elem => {
        const instance = M.Timepicker.getInstance(elem);
        if (instance) {
          instance.destroy();
        }
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleBreakTimeChange = (index, field, value) => {
    const newBreakTimes = settings.breakTimes.map((breakTime, i) => {
      if (index === i) {
        return { ...breakTime, [field]: value };
      }
      return breakTime;
    });
    setSettings(prevSettings => ({ ...prevSettings, breakTimes: newBreakTimes }));
  };

  const handleArrayChange = (index, name, value) => {
    const newArray = settings[name].map((item, i) => (i === index ? value : item));
    setSettings(prevSettings => ({ ...prevSettings, [name]: newArray }));
  };

  const addBreakTime = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      breakTimes: [...prevSettings.breakTimes, { start: '', end: '' }]
    }));
  };

  const removeBreakTime = (index) => {
    const newBreakTimes = settings.breakTimes.filter((_, i) => i !== index);
    setSettings(prevSettings => ({ ...prevSettings, breakTimes: newBreakTimes }));
  };

  const addLongTermGoal = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      longTermGoals: [...prevSettings.longTermGoals, '']
    }));
  };

  const removeLongTermGoal = (index) => {
    const newGoals = settings.longTermGoals.filter((_, i) => i !== index);
    setSettings(prevSettings => ({ ...prevSettings, longTermGoals: newGoals }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
      <div className="input-field">
          <input
            id="sleepTime"
            name="sleepTime"
            type="text"
            className="timepicker"
            value={settings.sleepTime}
            onChange={handleChange}
          />
          <label htmlFor="sleepTime">Sleep Time</label>
        </div>

        <div className="input-field">
          <input
            id="wakeUpTime"
            name="wakeUpTime"
            type="text"
            className="timepicker"
            value={settings.wakeUpTime}
            onChange={handleChange}
          />
          <label htmlFor="wakeUpTime">Wake Up Time</label>
        </div>
        {settings.breakTimes.map((breakTime, index) => (
          <div key={`breakTime-${index}`}>
            <div className="input-field">
              <input
                id={`breakTimeStart-${index}`}
                type="text"
                className="timepicker"
                value={breakTime.start}
                onChange={(e) => handleBreakTimeChange(index, 'start', e.target.value)}
              />
              <label htmlFor={`breakTimeStart-${index}`}>Break Start Time {index + 1}</label>
            </div>
            <div className="input-field">
              <input
                id={`breakTimeEnd-${index}`}
                type="text"
                className="timepicker"
                value={breakTime.end}
                onChange={(e) => handleBreakTimeChange(index, 'end', e.target.value)}
              />
              <label htmlFor={`breakTimeEnd-${index}`}>Break End Time {index + 1}</label>
            </div>
            <button type="button" onClick={() => removeBreakTime(index)} className="btn-small red">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addBreakTime} className="btn-small blue">Add Break Time</button>
        {settings.longTermGoals.map((goal, index) => (
          <div key={`longTermGoal-${index}`}>
            <div className="input-field">
              <textarea
                id={`longTermGoal-${index}`}
                className="materialize-textarea"
                value={goal}
                onChange={(e) => handleArrayChange(index, 'longTermGoals', e.target.value)}
                data-length="120"
              ></textarea>
              <label htmlFor={`longTermGoal-${index}`}>Long Term Goal {index + 1}</label>
            </div>
            <button type="button" onClick={() => removeLongTermGoal(index)} className="btn-small red">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addLongTermGoal} className="btn-small blue">Add Long Term Goal</button>

        <button className="btn waves-effect waves-light" type="submit">Save Settings</button>
      </form>
    </div>
  );
};


export default SettingsPage;

