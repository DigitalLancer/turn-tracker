import React, { useEffect, useState } from 'react'
import './listElement.css'
function ListElement(props) {
    const character = props.characterObject;

    const [name,setName]=useState(character.name);
    const [hp,setHp]=useState(character.hp);
    const[ac,setAc]=useState(character.ac);
    const [initiative,setInitiative]=useState(character.initiative)

    function handleNameChange(event){
        setName(event.target.value);
    }
    function handleHpChange(event){
        setHp(event.target.value)
    }
    function handleAcChange(event){
        setAc(event.target.value)
    }
    function handleInitChange(event){
        setInitiative(event.target.value)
    }

    /*return (
        <div className='list-element'>
            <p className='element-attribute'>{character.name}</p>
            <p className='element-attribute'>{character.hp}</p>
            <p className='element-attribute'>{character.ac}</p>
            <p className='element-attribute'>{character.initiative}</p>
        </div>
    )*/
    if (props.turnActive) {
        return (
            <div className='list-element '>
                <input className='element-attribute active' type="text" value={character.name}/>
                <input className='element-attribute active' type="text" value={character.hp}/>
                <input className='element-attribute active' type="text" value={character.ac}/>
                <input className='element-attribute active' type="text" value={character.initiative}/>
            </div>
        )
    }
    else {
        return (
            <div className='list-element'>
                <input className='element-attribute' type="text" value={character.name}/>
                <input className='element-attribute' type="text" value={character.hp}/>
                <input className='element-attribute' type="text" value={character.ac}/>
                <input className='element-attribute' type="text" value={character.initiative}/>
            </div>
        )
    }

}

export default ListElement