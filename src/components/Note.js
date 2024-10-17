import React from 'react'
import { useState, useEffect } from 'react'

const Note = () => {
  let [input, setInput] = useState('')
  let [textArea, setTextArea] = useState('')
  let [notes, setNotes] = useState( JSON.parse(localStorage.getItem('notes')) || []);
  let [isExpended, setIsExpended] = useState(false)

useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes))
},[notes]);

  function handleAdd(){
    let newNote = {
      title: input,
      content : textArea
    }
    console.log(input, textArea)
    setNotes([...notes, newNote])
    setInput('');
    setTextArea('');
  }

  function handleDelete(index){
    let updateNotes = [...notes];
    updateNotes.splice(index,1);
    setNotes(updateNotes);
  }

  return (
    <div>
      <div className='contentCreator'>
        <div className='top'>

          {(isExpended) ? <input className='title' 
          type="text" 
          placeholder='Title'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          /> : null}

          <textarea 
          onClick={() => setIsExpended(true)}
          className='content' 
          name="content" id="content" cols="30" rows={isExpended ? '3' : '1'} 
          placeholder='Take a note...'
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
          ></textarea>

          {isExpended ? <div className='addButton'>
            <button onClick={(handleAdd)}>Add</button>
          </div> : null}

        </div>
      </div>
      <div className='allnotes'>
        {notes.map((notes, index) => (
        <div key={index} className='note'>
          <h1>{notes.title}</h1>
          <p>{notes.content}</p>
          <div className='deleteButton'>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Note