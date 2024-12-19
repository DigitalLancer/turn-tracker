import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListElement from './components/ListElement'
import deleteIcon from './images/delete_icon.svg'

function App() {
  const [elements, setElements] = useState([]);
  const [name, setName] = useState('');
  const [initative, setInitiative] = useState("");
  const [hp, setHp] = useState("");
  const [ac, setAc] = useState("");
  const [turn, setTurn] = useState(0);
  const [round, setRound] = useState(1);
  function handleSetName(event) {
    setName(event.target.value)
  }
  function handleSetInit(event) {
    setInitiative(event.target.value)
  }
  function handleSetHp(event) {
    setHp(event.target.value)
  }
  function handleSetAc(event) {
    setAc(event.target.value)
  }
  function handleAddCharacter(event) {
    const newCharacter = { name: name, initiative: initative, hp: hp, ac: ac }
    setElements(e => [...e, newCharacter]);
    setName("");
    setHp("");
    setInitiative("");
    setAc("");
    console.log("character added")
    console.log(elements)
  }
  function handleNextTurn() {
    if (elements.length > 0) {
      if (turn < elements.length - 1) {
        setTurn(turn + 1);
      }
      else {
        setTurn(0);
        setRound(round + 1);
      }
    }
    else {
      alert("Please add a character first");
    }
  }
  function handeBackTurn() {
    if (turn > 0) {
      setTurn(turn - 1);
    }
  }
  function sortElements() {
    const newArray = [...elements].sort((a, b) => b.initiative - a.initiative);
    setElements(newArray);
  }
  function clearTurnOrder(index) {
    setTurn(0);
    setElements([]);
    setRound(1);
  }
  function handleDeleteElement(index) {
    const newList = elements.filter((element, i) => i !== index);
    setElements(newList);
  }

  return (
    <>
      <div className='container'>
        <h1 className='title'>Turn Tracker</h1>
        <div className='input-container'>
          <h2>
            Enter Character Stats
          </h2>
          <div className='input-grid'>
            <input type="text" className='input' placeholder='Name' onChange={handleSetName} value={name} />
            <input type="number" inputMode='numeric' className='input' placeholder='Initiative' onChange={handleSetInit} value={initative} />
            <input type="number" inputMode='numeric' className='input' placeholder='HP' onChange={handleSetHp} value={hp} />
            <input type="number" inputMode='numeric' className='input' placeholder='AC' onChange={handleSetAc} value={ac} />
          </div>
          <div className="button-container">
            <button type='submit' onClick={handleAddCharacter}>Submit</button>
          </div>
        </div>
        <div className="list">
          <div className="control-buttons">
            <div className="left-btn">
              <button onClick={handleNextTurn} className='control-btn next'>Next</button>
              <button onClick={handeBackTurn} className='control-btn back'>Previous</button>
            </div>
            <div className="right-btn">
              <button onClick={sortElements} className='control-btn sort'>Sort</button>
              <button onClick={clearTurnOrder} className='control-btn clear'>Clear</button>
            </div>
          </div>

          <h1>Round {round}</h1>
          <div className="attributes">
            <h2>Name</h2>
            <h2>HP</h2>
            <h2>AC</h2>
            <h2>Initiative</h2>
          </div>
          <ol>
            {elements.map((element, index) => {
              if (index == turn) {
                return (
                  <div className="element-container">
                    <li key={index}>
                      <ListElement characterObject={element} turnActive={true} />
                    </li>
                    <button className='delete-btn'><img src={deleteIcon} alt="" onClick={() => handleDeleteElement(index)} /></button>
                  </div>
                )
              }
              else {
                return (
                  <div className='element-container'>
                    <li key={index}>
                      <ListElement characterObject={element} turnActive={false} />
                    </li>
                    <button className='delete-btn'><img src={deleteIcon} alt="" onClick={() => handleDeleteElement(index)} /></button>
                  </div>
                )
              }
            }
            )}
          </ol>
        </div >
      </div >

    </>
  )
}

export default App
