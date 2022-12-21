import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { MDBCol } from 'mdb-react-ui-kit';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import fetch from 'isomorphic-fetch';

const geslachten = [
    {
        value: "Man",
        label: "Man",
    },
    {
        value: "Vrouw",
        label: "Vrouw",
    }];

const Profiel = () => {
    const [gebruikers, setGebruikers] = useState([]);
    const [voornaam, setVoornaam] = useState('');
    const [achternaam, setAchternaam] = useState('');
    const [geslacht, setGeslacht] = useState('Man');
    const [geboorteDatum, setGeboorteDatum] = useState('');
    const [id, setId] = useState('');
    const [user, setUser] = useState(undefined);
    const [producten, setProducten] = useState([]);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    //gebruiker updaten methode
    const updateGebruiker = async (e) => {
        e.preventDefault()
        const gebruiker = {voornaam, achternaam, geslacht, geboorteDatum }
        const response = await fetch("/gebruiker/update", {
            method: "PUT",
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gebruiker),
            credentials: 'include'
        });
        const res = await response.json();
        if (response.status >= 200 && response.status < 300) {
            toast.success(res);
        }
        else {
            toast.error(res);
        }
    }

    //verwijder gebruiker.
    const deleteGebruiker = async (e) => {
        e.preventDefault();
        const response = await fetch("/gebruiker/delete/" + id, {
            method: "DELETE",
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        const res = await response.json();
        if (response.status >= 200 && response.status < 300) {
            deleteMessagesFromGebruiker();
            logout();
            toast.success(res);
        }
        else {
            toast.error(res);
        }
    }

    //verwijdert alle berichten van de gebruiker.
    function deleteMessagesFromGebruiker(){
        fetch('http://localhost:8080/bericht/deleteAllFromUser/' + id,{
            method:"DELETE",
        });
    }
    //logout
    const logout = () => {
        fetch('/login/logout', {
          method: 'POST', credentials: 'include',
          headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] }
        })
        .then(res => res.json())
        .then(response => {
          window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
            + `&post_logout_redirect_uri=${window.location.origin}`;
        });
    }

    //Haal alle gebruikers op.
    const getAll = async (e) => {
        e.preventDefault()
        const response = await fetch(
            "http://localhost:8080/gebruiker/getAll", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        setGebruikers(res);
    }

    //Haalt alle producten van de meegegeven gebruiker.
    const getProductsFromUser = async (e) => {
        e.preventDefault()
        const response = await fetch(
            "http://localhost:8080/gebruiker/producten/" + id, {
            method: "GET",
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        const res = await response.json();
        setProducten(res);
    }

    //Haalt de gegevens op van de ingelogde gebruiker.
    async function getUser() {
        const req = await fetch("/gebruiker/getUser",{
            method:"GET",
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
        const response = await req.json();
        setUser(JSON.stringify(response));  
      }

    //Verandert de staat van de geslacht wat de gebruiker kiest.
    const handleChange = (event) => {
        setGeslacht(event.target.value);
    };

    return (
        <div /*onLoad={getUser()}*/ style={{ height: "1000px", textAlign: "center" }}>
            <MDBCol>
                <form onSubmit={updateGebruiker}>
                    <h1>Gebruiker updaten</h1>
                    <label>Voornaam</label><br />
                    <TextField id="outlined-basic" label="Voornaam" variant="outlined"
                        value={voornaam}
                        onChange={(e) => setVoornaam(e.target.value)}
                        required
                    /><br />
                    <label>Achternaam</label><br />
                    <TextField id="outlined-basic" label="Achternaam" variant="outlined"
                        value={achternaam}
                        onChange={(e) => setAchternaam(e.target.value)}
                        required
                    /><br />
                    <label>Geslacht</label><br />
                    <TextField
                        id="outlined-select-currency"
                        select
                        value={geslacht}
                        onChange={handleChange}
                        required>
                        {geslachten.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <br />
                    <label>GeboorteDatum</label><br />
                    <TextField type="date" 
                        max="2007-01-01" 
                        min="1930-01-01" 
                        id="outlined-basic" variant="outlined"
                        value={geboorteDatum}
                        onChange={(e) => setGeboorteDatum(e.target.value)}
                        required
                    />
                    <br /><br />
                    <Button type="submit" variant="contained" color="primary">
                        Update.</Button>
                    <ToastContainer />
                </form>
                <div data-testid="user1" style={{visibility:"hidden"}}>Marktplaats</div>
                <Button variant="contained" type="button" onClick={getAll}>Zie alle gebruikers</Button>
            </MDBCol>
            <MDBCol>
                <h1>Gebruikers</h1>
                <div>
                    {gebruikers.map(gebruiker => (
                        <div data-testid="gebruikers" label="gebruikers" style={{ margin: "10px", padding: "15px", textAlign: "center" }} key={gebruiker.id} >
                            <hr />
                            <Button type="button" onClick={getProductsFromUser} onClickCapture={() => { setId(gebruiker.id) }}
                                style={{ float: "left" }}>Zie producten</Button>
                            <Button type="button" onClick={deleteGebruiker} onClickCapture={() => { setId(gebruiker.id) }}
                                style={{ float: "right", color: "crimson" }}>
                                Verwijder
                            </Button>
                            <ToastContainer />
                            Gebruikersnaam: {gebruiker.gebruikersnaam}<br />
                            Email: {gebruiker.email}<br />
                            Id:{gebruiker.id}
                        </div>
                    ))}
                </div>
            </MDBCol>
            <MDBCol> <div>
                <p>Producten</p>
                {producten.map(product => {
                    return <li key={product.id}>{product.naam}</li>
                })}
            </div>
            </MDBCol>
        </div>
    );
}
export default Profiel;
