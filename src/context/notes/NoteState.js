import noteContext from "./noteContext";

const noteState=(props)=>{
    const state ={
        "name":"Gohil",
        "std":"22"
    }

    return <noteContext.Provider value={state}>
        {props.children}
    </noteContext.Provider>
}

export default noteState