import React, { Component } from 'react'
import Axios from 'axios'
import { API_URL } from '../supports/ApiUrl'


class ManageTransaction extends Component {
    state = {
        transactionId: "",
        productId: "",
        modaladd: false,
        id: ""
    }

    componentDidMount(){
        Axios.get(`${API_URL}/transactiondetails`)
        .then (res => {
            this.setState({dataproduk: res.data})
        })
        .catch( err => {
            console.log(err)
        })
    }

    renderTransaction = () => {
        return this.state.dataproduk.map((val) => {
            <tr key={index}>
                <td>{val.transactionId}</td>
                <td>{val.productId}</td>
                <td>{val.id}</td>
                <td><Button onClick={() =>this.acceptTransaction(val)} variant="info">Accept</Button> </td>
            </tr>
        })
    }
}

