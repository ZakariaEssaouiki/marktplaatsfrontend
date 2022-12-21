import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Col from 'react-bootstrap/Col';
import { Row } from "react-bootstrap";

const Advertenties = () => {

    const [alignment, setAlignment] = useState("");
    const [producten, setProducten] = useState([]);
    const [gebruikers, setGebruikers] = useState([]);
    const [gebruiker, setGebruiker] = useState({
        gebruikersnaam: ""
    });
    const [product, setProduct] = useState({
        id: "",
        naam: "",
        prijs: "",
        beschrijving: "",
        datum: ""
    });

    //Methode die alle advertenties ophaalt.
    const getAllAdvertenties = async (e) => {
        e.preventDefault();
        const request = await fetch("/product/getAll");
        const response = await request.json();
        setProducten(response);
    }

    //Methode die de gebruiker ophaalt van een bepaalde product.
    async function getGebruikerVanProduct(id) {
        //e.preventDefault();
        const request = await fetch("/product/findUserByProduct/" + id);
        const response = await request.json();
        setGebruiker(response);
    }

    function showCard(product) {
        //getGebruikerVanProduct(product.id);
        return <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {gebruiker.gebruikersnaam}
                </Typography>
                <Typography variant="h5" component="div">
                    {product.naam}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    &euro; {product.prijs}
                </Typography>
                <Typography variant="body2">
                    {product.beschrijving}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </React.Fragment>
    }

    return (
        <div>
            <Button variant="contained" style={{margin:"10px"}} onClick={getAllAdvertenties} onClickCapture={() => setAlignment("justify")}>Zie alle producten</Button>
            <br />
            <Row>
                <Col>
                    {
                    producten.map((product) => (
                    <Card key={product.id} variant="outlined" align={alignment}>{showCard(product)}</Card>
                    ))
                    }
                </Col>
            </Row>
        </div>
    )
}
export default Advertenties;