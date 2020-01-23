import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom'
// import '../styles/home.css'

class Home extends Component {

    render() {
        return (
            <div>
                {/* <div id="u-input">
                    <input type="text" placeholder="Ask and you shall receive" />
                    <div id="button">Seek</div>
                </div> */}

                <h1 id="home-title">Who's Watching?</h1>

                <div id="users">
                    <Link className="user" to="/Catalog/"> <div id="Noam"><span className="users">Noam</span></div></Link>
                    <Link className="user" to="/Catalog/"> <div id="Yakov"><span className="users">Yakov</span></div></Link>
                    <Link className="user" to="/Catalog/"> <div id="Sapir"><span className="users">Sapir</span></div></Link>
                    <Link className="user" to="/Catalog/"> <div id="Shoam"><span className="users">Shoam</span></div></Link>
                </div>
            </div>
        );
    }
}

export default Home;