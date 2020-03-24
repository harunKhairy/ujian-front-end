import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/login'
import Header from './components/header'
import Home from './pages/home'
import {Switch,Route} from 'react-router-dom'
import Axios from 'axios';
import { API_URL } from './supports/ApiUrl';
import { KeepLogin } from './redux/actions';
import {connect} from 'react-redux'
import ManageAdmin from './pages/manageadmin'
import Norfound from './pages/notfound';
import Productdetail from './pages/productdetail'
import Cart from './pages/Cart'
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import AllProducts from './pages/AllProducts';
// import History from "./pages/History"




function App({KeepLogin}) {

  const [Loading,setLoading]=useState(true)

  useEffect(()=>{
    var id=localStorage.getItem('iduser')
    if(id){
      Axios.get(`${API_URL}/users/${id}`)
      .then(res=>{
        KeepLogin(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[])

  if(Loading){
    return <div>loading....</div>
  }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/manageadmin' exact component={ManageAdmin}/>
        <Route path='/productdetail/:idprod' exact component={Productdetail}/>
        <Route path='/cart' exact component={Cart}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/change_password' exact component={ChangePassword}/>
        <Route path='/all-produk' exact component={AllProducts}/>
        {/* <Route path='/history' exact component={History}/> */}

        <Route path='/*' component={Norfound}/>
      </Switch>
    </div>
  );
}



export default connect(null,{KeepLogin})(App);
