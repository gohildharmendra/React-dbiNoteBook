import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function About() {
  const a = useContext(noteContext)
  return (
    <div className="container my-5">
      <h1>About Component</h1>
      <h2>name is : {a.name}</h2>
    </div>
  )
}
