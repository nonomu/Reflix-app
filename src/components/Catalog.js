import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Movie from './Movie';
import Axios from 'axios';
let serverApi = 'http://localhost:4200/api'


class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userFavorites: []
        }
    }
    getUserFavorites = async () => {
        let userId = parseInt(this.props.match.params.id)
        let favorites = await Axios.get(`${serverApi}/favorites/${userId}`)
        favorites = favorites.data[0]
        this.setState({ userFavorites: favorites })
    }
    componentDidMount = async () => {
        this.getUserFavorites(parseInt(this.props.match.params.id))
    }
    render() {
        let userId = parseInt(this.props.match.params.id)
        let user = this.props.state.users.find(u => u.id === userId)
        const favoriteMovies = this.state.userFavorites
        let moviesAvailable = this.props.state.movies.filter(c => c.isRented === false)
        return (
            user ? (
            <div className="movie-container">
                <h4  style={{color: "white" , textAlign:"center"}} >Budget:{user.budget}$</h4>
                <div><h2> Favorites:</h2></div>
                <div id="favorite-movies">

                    {favoriteMovies.map(f => 
                        <Movie getUserFavorites={this.getUserFavorites} user={user} rentalChange={this.props.rentalChange} movie={f} key={f.image} />
                    )}
                </div>
                <div> <h2> Movies available: </h2></div>
                <div id="available-movies">

                    {moviesAvailable.map(m=> 
                       <Movie getUserFavorites={this.getUserFavorites} user={user} rentalChange={this.props.rentalChange} movie={m} key={m.image} />
                    )}
                </div>
            </div>) : null
        )
    }
}

export default Catalog