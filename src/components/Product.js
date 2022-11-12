import React,{useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const[naam, setNaam]=useState();
    const[beschrijving, setBeschrijving]=useState();
    const[prijs,setPrijs]=useState();
    const[producten,setProducten]=useState([]);
    const voegProductToe= async (e)=>{
        e.preventDefault()
        const product={naam,beschrijving,prijs}
        const response = await fetch(
            "http://localhost:8080/product/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(product)
        });
        const res = await response.json();
        if(response.status >= 200 && response.status < 300){
            toast.success(res);
        }
        else{
            toast.warning(res);
        }
    };

    const getAll = async (e) =>{
        e.preventDefault()
        const response = await fetch(
            "http://localhost:8080/product/getAll",{
                method:"GET",
                headers:{"Content-Type":"application/json"},
            });
            const res = await response.json();
            setProducten(res);
    }
    return(
        <form className="text-align center" onSubmit={voegProductToe}>
            <h1>Product toevoegen</h1>
            <label>Naam</label>
            <input type="text" name="naam" value={naam} onChange={(e)=>setNaam(e.target.value)} required/>
            <br/>
            <label>Prijs</label>
            <input type="number" name="prijs" value={prijs} onChange={(e)=>setPrijs(e.target.value)} required/>
            <br/>
            <label>Beschrijving</label>
            <input type="textarea" name="beschrijving" value={beschrijving} onChange={(e)=>setBeschrijving(e.target.value)} required/>
            <br/>
            <br/>
            <div>
            <button type="submit">Voeg toe</button>
            <ToastContainer/>
            </div>
            <br/>
            <div className="text-align center">
                <button onClick={getAll}>Zie alle producten</button>
                <br/>
                {producten.map((product, key) => {
                    return <li key={key} >
                        {product.naam}
                        </li>
                })}
            </div>
        </form>
        )
    }
    export default Product;