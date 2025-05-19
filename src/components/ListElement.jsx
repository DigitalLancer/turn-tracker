import React, { useEffect, useState } from 'react'
import './listElement.css'
import deleteIcon from '../images/delete_icon.svg'
function ListElement(props) {
    const character = props.characterObject;

    const handleNameChange=(event)=>{
        console.log(event);
        const newName=event.target.value;
        props.handleChange(character.id, "name",newName);
    }
    const handleHPChange=(event)=>{
        const newHP=event.target.value;
        props.handleChange(character.id, "hp",newHP);
    }
    const handleACChange=(event)=>{
        const newAC=event.target.value;
        props.handleChange(character.id,"ac",newAC);
    }

        return (
            <div className='list-element '>
                <input className={`element-attribute ${props.turnActive ? 'active' : ''}`} type="text" value={character.name} onChange={handleNameChange}/>
                <input className={`element-attribute ${props.turnActive ? 'active' : ''}`} type="text" value={character.hp} onChange={handleHPChange}/>
                <input className={`element-attribute ${props.turnActive ? 'active' : ''}`} type="text" value={character.ac} onChange={handleACChange}/>
                <input className={`element-attribute ${props.turnActive ? 'active' : ''}`} type="text" value={character.initiative} readOnly/>
                <button className='delete-btn'><img src={deleteIcon} alt="" onClick={() => props.handleDelete(character.id)} /></button>
            </div>
        )
    


}

export default ListElement