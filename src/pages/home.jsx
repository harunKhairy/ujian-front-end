import React, { Component } from 'react';
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
// import {Redirect} from 'react-router-dom'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import Numeral from 'numeral'
import Axios from 'axios'
import {API_URL} from './../supports/ApiUrl'
import {FaArrowAltCircleRight} from 'react-icons/fa'
import {BukanHome,IniHome} from './../redux/actions'
import {FaCartPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import AllProducts from './AllProducts';

class Home extends Component {
    state = {
        photos:[
            './image/city-daylight-diversity-fashion-1154861.jpg',
            './image/fashion-sunglasses-woman-girl-46244.jpg',
            './image/adult-beautiful-elegant-eyewear-291762.jpg'
        ],
        products:[],
        searchProducts:[],
        sortNama:0,
        sortPrice:0,
    }
    

    componentDidMount(){
        this.props.IniHome()
        Axios.get(`${API_URL}/products?_expand=kategori&_limit=5`)
        .then((res)=>{
            this.setState({products:res.data, searchProducts: res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    componentWillUnmount=()=>{
        console.log('jalan unmount')
        this.props.bukan()
    }

    onSearchClick=()=>{
        let inputName=this.name.value
        let inputMin=parseInt(this.min.value)
        let inputMax=parseInt(this.max.value)

        let hasilFilter=this.state.products.filter((product)=>{
            return (
            product.name.toLowerCase().includes(inputName.toLowerCase()) 
            )
        })

        
        let hasilFilterHarga=hasilFilter.filter((product)=>{
            
            if (!inputMax && !inputMin){
                return hasilFilter
            } if (inputMax && inputMin) {
                return (product.harga>=inputMin && product.harga<=inputMax)
            } if (inputMax && !inputMin){
                return (product.harga<=inputMax)
            } if (!inputMax && inputMin){
                return (product.harga>=inputMin)
            }
        })

        this.setState({searchProducts:hasilFilterHarga})
    }

    onResetClick=()=>{
        this.name.value=''
        this.min.value=''
        this.max.value=''
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products
            }
        })
    }

    urut=(a,b)=>{
        return a.harga-b.harga
    }
    urutDes=(a,b)=>{
        return b.harga-a.harga
    }
      
    urutHuruf=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    }   
    urutHurufDes=(a,b)=>{
        
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
    }   

    onSortName=()=>{
        if (!this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHuruf)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:1})
        } if (this.state.sortNama){
            var hasilFilter=this.state.searchProducts.sort(this.urutHurufDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortNama:0})
        }
    }

    onSortHarga=()=>{
        if (!this.state.sortHarga){
            var hasilFilter=this.state.searchProducts.sort(this.urut)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortHarga:1})
        } if (this.state.sortHarga){
            var hasilFilter=this.state.searchProducts.sort(this.urutDes)
            this.setState({searchProducts:hasilFilter})
            this.setState({sortHarga:0})
        }
    }

    renderList=()=>{
        return this.state.searchProducts.map((product)=>{
            return(
                <AllProducts barang={product} key={product.id}/>
            )
            
        })  
    }

    renderphoto=()=>{
        return this.state.photos.map((val,index)=>{
            return (
                <MDBCarouselItem key={index} itemId={index+1}>
                    <MDBView>
                        <div style={{width:'100%',height:650,display:'flex'}}>
                            <img
                                // className=""
                                src={val}
                                alt="First slide"
                                // height='100%'
                                width='100%'
                            />
                        </div>
                        <MDBMask overlay="black-slight" />
                    </MDBView>
                </MDBCarouselItem>
            )
        })
    }

    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
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
            <div>
                {/* carosel */}
                <MDBCarousel
                    activeItem={1}
                    length={this.state.photos.length}
                    interval={1800}
                    showIndicators={false}
                    showControls={false}
                >
                    <MDBCarouselInner>
                        {this.renderphoto()}
                    </MDBCarouselInner>
                </MDBCarousel>

                <div className="container" >
                    <div className="row" >
                    <div className="col-3">
                                <div className="card mt-5 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-light">
                                        <h3 className="d-inline">Search</h3>
                                    </div>
                                    <form className="form-group mb-0 mx-1">
                                        <h5>Name :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.name=input}} 
                                        className="form-control my-3 btn-light" placeholder="product" type="text" name="" id=""/>        

                                        <h5>Price :</h5>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.min=input}} 
                                        className="form-control btn-light" placeholder="minimum" type="text" name="" id=""/>
                                        <input onChange={this.onSearchClick} 
                                        ref={(input)=>{this.max=input}} 
                                        className="form-control my-3 btn-light" placeholder="maximum" type="text" name="" id=""/>
                                    </form>
                                    <div className="d-inline-block align-bottom text-right">
                                        <button onClick={this.onResetClick} className="btn btn-block btn-sm btn-secondary">Refresh</button>
                                    </div>
                                </div>
                                <div className="card mt-2 p-3 shadow-sm mr-2">
                                    <div className="card-title border-bottom border-dark">
                                        <h3 className="d-inline">Sort by</h3>
                                    </div>
                                    <div className="mx-2">
                                        <button onClick={this.onSortName} className="btn btn-sm btn-block btn-warning">Product Name</button>
                                        <button onClick={this.onSortHarga} className="btn btn-sm btn-block btn-warning">Product Price</button>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>

                {/* best seller */}
                <div className='px-5 pt-3'>
                    <div>Best seller <FaArrowAltCircleRight/></div>
                    <div className="d-flex ">
                        {this.renderProducts()}
                    </div>
                    
                    <div>

                    </div>
                </div>
                <AllProducts />
            </div>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps,{bukan:BukanHome,IniHome}) (Home);