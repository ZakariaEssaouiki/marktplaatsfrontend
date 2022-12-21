import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Product = () => {

    const [naam, setNaam] = useState();
    const [beschrijving, setBeschrijving] = useState();
    const [prijs, setPrijs] = useState();
    const [producten, setProducten] = useState([]);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});
    const [eigenProducten, setEigenProducten] = useState([]);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    //voeg product toe event.
    const voegProductToe = async (e) => {
        e.preventDefault()
        const product = { naam, beschrijving, prijs }
        const response = await fetch(
            "/product/add", {
            method: "POST",
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product),
            credentials: 'include'
        });
        const res = await response.json();
        if (response.status >= 200 && response.status < 300) {
            toast.success(res);
        }
        else {
            toast.warning(res);
        }
    };

    //get all producten event.
    function getAll() {
        fetch(
            "/product/getAll", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then(data => {
            setProducten(data);
        });
    }

    //Haalt alle producten op van de meegegeven gebruiker.
    function getAllFromUser() {
        fetch("/gebruiker/producten/" + user.id)
        .then(response => response.json())
        .then(data => {
            setEigenProducten(data);
        });
    }

    //Haalt de gebruiker op basis van credentials.
    function getUser() {
        fetch("/gebruiker/getUser", {
            method: "GET",
            headers: {
                'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }).then(response => response.json())
            .then(data => {
                setUser(data);
            });
    }

    useEffect(() => {
        getUser();
        getAllFromUser();
        getAll();
    },[])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginLeft: "10px",textAlign:"center",borderBottom:"0.2px solid black",borderRight:"0.2px solid black" }}>
                <form onSubmit={voegProductToe}>
                    <h1>Product toevoegen</h1>
                    <TextField
                        required
                        id="outlined-required"
                        label="Naam"
                        placeholder="Naam"
                        value={naam}
                        onChange={(e) => setNaam(e.target.value)}
                    />
                    <br />
                    <br />
                    <TextField
                        id="outlined-number"
                        label="Prijs"
                        type="number"
                        min="0"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={prijs}
                        onChange={(e) => setPrijs(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        id="outlined-multiline-static"
                        label="Beschrijving"
                        multiline
                        rows={4}
                        placeholder="Beschrijving"
                        value={beschrijving}
                        onChange={(e) => setBeschrijving(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <div>
                        <Button variant="contained" type="submit">Voeg toe</Button>
                        <ToastContainer />
                    </div>
                    <br />
                </form>
            </div>
            <div style={{ display: 1, marginRight: '30%',marginLeft:'10px' }}>
                <h1>Eigen producten</h1>
                {eigenProducten.length > 0 ? eigenProducten.map((product) => {
                    return <li id="product" key={product.id}>
                        {product.naam}<span style={{marginLeft:"10%",color:"blue"}}>&euro;{product.prijs}</span>
                    </li>
                }) : <p>U hebt nog geen producten.</p>}
            </div>
        </div>
    )
}
export default Product;