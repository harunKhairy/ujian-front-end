import React, { Component } from 'react'
import Axios from 'axios'
import { API_URL } from '../supports/ApiUrl'
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Numeral from 'numeral'
// import {FaArrowAltCircleRight} from 'react-icons/fa'
import {FaCartPlus} from 'react-icons/fa'


class AllProducts extends Component {
    state = {
        products: [],
        category: "",
        searchProduct: [],
    }

    componentDidMount() {
        Axios.get( `${API_URL}/products?_expand=kategori`)
        .then(response => {
            this.setState ({products: response.data})
        })
        .catch ( err => {
            console.log(err)
        })
    }

    renderProducts = () => {
        return this.state.dataproducts.map ((val, index) => {
            return (
               
                
                <div key={index} className='p-3' style={{width:'20%'}}>
                    
                    <Card>
                        <div style={{height:300,width:'100%'}}>
                            <img src={val.image} height='100%' width='100%' alt=""/>
                            <div className='kotakhitam'>
                                <Link to={`/productdetail/${val.id}`} className='tombolebuynow'>
                                    <button className='tomboldalam'><FaCartPlus/></button>
                                </Link>
                            </div>  
                        </div>
                        <CardBody style={{height:150}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.harga).format(0.0)}</CardSubtitle>
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.kategori.nama}</button>
                        </CardBody>
                    </Card>
                </div>
                
            )
        })
    }

    render() { 
        return ( 
            <div className='mx-5'>
                <div className="row py-5 " style={{paddingLeft: '10%', paddingRight: '10%'}}>
                    {this.renderProducts()}
                </div>
            </div>
         );
    }
}


export default AllProducts;
