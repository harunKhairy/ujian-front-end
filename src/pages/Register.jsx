import React, { Component } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";
import { Redirect } from "react-router-dom";
import "./Register.css"


class Register extends Component {
  state = {
    islogin: false
  };

  onClickRegister = e => {
    e.preventDefault();
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var confirmPassword = this.refs.confirmPassword.value;
    var role = "user";
    var newUser = { username, password, role };

    if (username === "" || password === "" || confirmPassword === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wajib di isi semua"
      });
    } else {
      Axios.get(`${API_URL}/users?username=${username}`)
        .then(res1 => {
          console.log(res1);
          if (res1.data.length === 0) {
            if (password !== confirmPassword) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password wajib sesuai"
              });
            } else {
              Axios.post(`${API_URL}/users`, newUser)
                .then(res => {
                  Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: " Terimakasih sudah mendaftar, silahkan Login"
                  });
                  this.setState({ islogin: true });
                })
                .catch(err1 => {
                  console.log(err1);
                });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `hai ${username}, akun tidak tersedia, coba dengan nama lain!`
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    if (this.state.islogin) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className="register-container">
          <form onSubmit={this.onClickRegister} >
          <div className="auth-card">
          <p className="register-title">Register</p>
          <input
            className="input"
            placeholder="username"
            type="text"
            ref="username"
          />
          <input
            className="input"
            placeholder="Password"
            type="password"
            ref="password"            
          />
          <input
            className="input"
            placeholder="confirm Password"
            type="password"
            ref="confirmPassword"            
          />
          <button
            className="register"
            onClick={this.onClickRegister}
            title="Register"
            >
                daftar </button>
        </div>
            </form>
       
      </div>
    );
  }
}

export default Register;
