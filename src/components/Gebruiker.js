import React, {useEffect, useState} from "react"; 

export default function Gebruiker(){
    const[gebruikersnaam,setGebruikersnaam]=useState('')
    const[email,setEmail]=useState('')
    const[gebruikers,setGebruikers]=useState([])
    const[id,setId]=useState('')
    const handleClick=(e)=>{
        e.preventDefault()
        const gebruiker={gebruikersnaam,email}
        console.log(gebruiker)
        fetch("http://localhost:8080/gebruiker/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(gebruiker)
        }).then(()=>{
            console.log("Gebruiker is succesvol toegevoegd")
            window.location.reload()
        })
    }
    const deleteGebruiker=(e)=>{
        e.preventDefault()
        const gebruiker={id}
        console.log(gebruiker)
        fetch("http://localhost:8080/gebruiker/Delete",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(gebruiker)
        }).then(()=>{
            console.log("Gebruiker is succesvol verwijderd")
        })
    }
    useEffect(()=>{
        fetch("http://localhost:8080/gebruiker/GetAll")
        .then(res=>res.json())
        .then((result)=>{
            setGebruikers(result);
        }
        )
    },[])
    return (
        <form noValidate autoComplete="off">
            <h1>Gebruiker toevoegen</h1>
            <label>Gebruikersnaam</label><br/>
            <input id="outlined-basic" label="Gebruikersnaam" variant="outlined"
             value={gebruikersnaam}
                onChange={(e)=>setGebruikersnaam(e.target.value)}
                /><br/>
                <label>Email</label><br/>
                <input id="outlined-basic" label="Email" variant="outlined"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <br/><br/>
                <button variant="contained" color="primary" onClick={handleClick}>
                    Voeg toe</button>
                    <hr/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1>Gebruikers</h1>
                <div>
                {gebruikers.map(gebruiker=>(
                    <div style={{margin:"10px",padding:"15px",textAlign:"center"}} key={gebruiker.id}>
                        <br/><hr/>
                    <button type="button" onClick={deleteGebruiker}>
                          Verwijder  
                    </button>
                    Gebruikersnaam: {gebruiker.gebruikersnaam}<br/>
                    Email: {gebruiker.email}
                    </div>
                ))}
                </div>
                </form>
                // Yelleh come on
    )
}
