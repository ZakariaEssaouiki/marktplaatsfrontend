import React, {useState} from "react"; 
import { ToastContainer, toast } from 'react-toastify';
//import fetch from "node-fetch";

const Gebruiker = () =>{
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
        const deleteGebruiker = async (e)=>{
            e.preventDefault();
            console.log(id);
            const response = await fetch("http://localhost:8080/gebruiker/delete/" + id,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
            });
            const res = await response.json();
            if(response.status >= 200 && response.status < 300){
                toast.success(res);
            }
            else{
                toast.error(res);
            }
         }
    
    const getAll = async (e) =>{
        e.preventDefault()
        const response = await fetch(
            "http://localhost:8080/gebruiker/getAll",{
                method:"GET",
                headers:{"Content-Type":"application/json"},
            });
            const res = await response.json();
            setGebruikers(res);
    }
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
                <br/>
                <br/>
                <br/>
                <div data-testid="user1">Marktplaats</div>
                <br/>
                <br/>
                <button type="button" onClick={getAll}>Zie alle gebruikers</button>
                <h1>Gebruikers</h1>
                <div>
                {gebruikers.map(gebruiker=>(
                    <div style={{margin:"10px",padding:"15px",textAlign:"center"}} key={gebruiker.id} >
                        <hr/>
                    <button type="button" onClick={deleteGebruiker} onClickCapture={() => {setId(gebruiker.id)}}
                    style={{float:"right"}}>
                          Verwijder  
                    </button>
                    <ToastContainer/>
                    Gebruikersnaam: {gebruiker.gebruikersnaam}<br/>
                    Email: {gebruiker.email}<br/>
                    Id:{gebruiker.id}
                    </div>
                ))}
                </div>
                </form>
    )
}
export default Gebruiker;
