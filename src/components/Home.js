import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom'
// import '../styles/home.css'

class Home extends Component {
   constructor()
   {
       super()
   }
   
    render() {
        let users=this.props.users
        return (
          users?  <div className="home-container">
                <div><h1 id="home-title">Who's Watching?</h1></div>
                <div id="users">
                    {users.map(u =>  <Link key={u.id} className="user" to={`/Catalog/user/${u.id}`}> <div id={u.name}><span className="users">{u.name}</span></div></Link>)}
                </div>
            </div>:null
        );
    }
}

export default Home;