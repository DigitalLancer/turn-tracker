import { useState } from 'react'
import './App.css'
import ListElement from './components/ListElement'
import deleteIcon from './images/delete_icon.svg'

function App() {
  const [elements, setElements] = useState([]);

  //id için karakter sayısını kaydet
  const [idIndex, setIdIndex] = useState(0);

  //Temel attributelar
  const [name, setName] = useState('');
  const [initative, setInitiative] = useState("");
  const [hp, setHp] = useState("");
  const [ac, setAc] = useState("");
  const [turn, setTurn] = useState(0);
  const [round, setRound] = useState(1);

  //Karakter submit edildiğinde statlarının güncelle
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
    const newCharacter = { name: name, initiative: initative, hp: hp, ac: ac, id: idIndex }//yeni karakter objesi oluştur
    setElements(prev => [...prev, newCharacter]);
    setIdIndex(idIndex + 1);

    //reset input field
    setName('');
    setAc('');
    setHp('');
    setInitiative('');
  }

  //Karakter özelliklerini update etme
  const handleUpdateAttr = (id, key, value) => {
    setElements(prevElements =>
      prevElements.map(character =>
        character.id === id ? { ...character, [key]: value } : character
      )
    );
  };

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
  function handleDeleteElement(id) {
    setElements(elements.filter(element => element.id !== id));
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
                  <li key={element.id}>
                    <ListElement characterObject={element} turnActive={true} handleChange={handleUpdateAttr} handleDelete={handleDeleteElement} />
                  </li>
                )
              }
              else {
                return (
                  <li key={element.id}>
                    <ListElement characterObject={element} turnActive={false} handleChange={handleUpdateAttr} handleDelete={handleDeleteElement} />
                  </li>
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
