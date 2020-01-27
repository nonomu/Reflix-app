import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Catalog from './components/Catalog'
import Movie from './components/Movie'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MovieDetail from './components/movieDetail';
import moviesData from './data/movies.json'
import { FaSearch } from 'react-icons/fa';
import axios from 'axios'
let serverApi = 'http://localhost:4200/api'
class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      users: [],
      usersFavorites: []
    }
  }
  componentDidMount = async () => {
    try{
        this.getBasicData()
  }
  catch(e)
  {
    alert("error with db")
    return false
  }
  }
  getUsers = async () => {
    try {
      let users = await axios.get(`${serverApi}/users`)
      this.setState({ users: users.data })
    }
    catch (e) {
      return false
    }
  }
  getMovies = async () => {
    try {
      let movies = await axios.get(`${serverApi}/movies`)
      this.setState({ movies: movies.data })
    }
    catch (e) {
      return false
    }
  }
  getBasicData = async () =>
  {
    let users = await axios.get(`${serverApi}/users`)
    let movies = await axios.get(`${serverApi}/movies`)
    this.setState({ users: users.data, movies: movies.data })
  }
  rentalChange = async (userId, movieId, userBudget, action) => {
    try{
      let rental = {
        userId: userId,
        movieId: movieId,
        budget: userBudget
      }
      if( action === "return")
      await axios.post(`${serverApi}/returnMovie`, rental)
      else{  
      if (userBudget - 3 < 0)return false
      if( action === "rent")
      await axios.post(`${serverApi}/rentMovie`, rental)
      }
      this.getBasicData()
      return true
    } 
    catch(e){
      return false
    }
  }
  render() {
    console.log("father")
    const state = this.state
    return (
      <Router>
        <div id="main-container">
        <div className="upper-bar">
          <Link className="logo" to="/">Reflix  </Link>
        </div>

        <div className="App">
          <Route exact path="/" render={() => <Home users={state.users} />} />
          <Route path="/Catalog/user/:id" exact render={({ match }) => <Catalog match={match} state={state} rentalChange={this.rentalChange} />} />
          <Route path="/Catalog/:movieName" exact render={({ match }) => <MovieDetail match={match} state={state} />} />
        </div>
        </div>
      </Router>
    )
  }
}

export default App;
