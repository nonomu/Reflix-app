import React,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Catalog from './components/Catalog'
import Movie from './components/Movie'
import { BrowserRouter as Router,Route,Link} from 'react-router-dom'
import MovieDetail from './components/movieDetail';
import moviesData from './data/movies.json'
import {FaSearch } from 'react-icons/fa';

console.log(moviesData)
class App extends Component {
  constructor()
  {
    super()
    this.state={
      budget:10,
      movies : moviesData.movies
    }
  }
  rentalChange= (movieId, budget)=>
  {
    let newBudget= this.state.budget - budget
    if(newBudget<0)
    {
      alert("Out of the Budget") 
      return 
    }
    let movies1=[...this.state.movies]
    let movieIndex=movies1.findIndex(m => m.id === movieId)
    movies1[movieIndex].isRented= !movies1[movieIndex].isRented
    this.setState({
      movies:movies1,
      budget: newBudget
    })
  }
  render (){
    const state = this.state
    console.log(this.state)
    return(
      <Router>
        <div className="links">
         <Link className="logo" to="/">Reflix  </Link>
          {/* <Link style={{textDecoration:"none" ,color:"white"}} to="/"> Home  </Link> */}
          <Link style={{textDecoration:"none", color:"white"}} to="/Catalog"> Catalog </Link>
        </div>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/Catalog/" exact render={() => <Catalog  state={state} rentalChange={this.rentalChange}/>}/>
          <Route path="/Catalog/:movieName" exact render={({ match }) => <MovieDetail match={match} state={state} />}/>
        </div>
        </Router>
    )}
}

export default App;
