import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "../components/NotFound.css"


class Norfound extends Component {
    state = {  }
    render() { 
        return (
            <div id="notfound" className="mt-0">
            <div className="notfound">
              <div className="notfound-404">
                {/* <h1>:(</h1> */}
              </div>
              <h2>Something went wrong.</h2>
              <p>
                The page you are looking for might have been removed had its name
                changed or is temporarily unavailable.
              </p>
              <Link to={'/'}>Home</Link>
            </div>
          </div>
          );
    }
}
 
export default Norfound;