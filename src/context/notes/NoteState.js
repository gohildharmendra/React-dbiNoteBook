import { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
    const noteInitialize =[
        {
          "_id": "62f7b8d118b5ae218e382fd0",
          "user": "62f7856f368566cfc294d9c0",
          "title": "This is First Note",
          "description": "walk-up early morning",
          "tag": "General",
          "date": "2022-08-13T14:44:33.958Z",
          "__v": 0
        },
        {
          "_id": "62f7b9d318b5ae218e382fd3",
          "user": "62f7856f368566cfc294d9c0",
          "title": "This is Second Note",
          "description": "hey walk-up early morning",
          "tag": "General",
          "date": "2022-08-13T14:48:51.397Z",
          "__v": 0
        },
        {
          "_id": "62f7ba1a9c8b7aa2d5892a5e",
          "user": "62f7856f368566cfc294d9c0",
          "title": "This is Third Note",
          "description": "Hello walk-up early morning",
          "tag": "General",
          "date": "2022-08-13T14:50:02.196Z",
          "__v": 0
        },
        {
          "_id": "62f7ba3e8cbb9af611b38e94",
          "user": "62f7856f368566cfc294d9c0",
          "title": "This is Fourth Note Updated",
          "description": "Hi walk-up early morning Updates",
          "tag": "other",
          "date": "2022-08-13T14:50:38.811Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(noteInitialize)

    return <noteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </noteContext.Provider>
}

export default NoteState