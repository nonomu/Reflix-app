import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Movie from './Movie';


class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [...props.state.movies],
            budget: props.state.budget,
            filter: ""
        }
    }

    render() {
        const budget = this.props.state.budget
        const favoriteMovies = this.props.state.movies.filter(c => c.isRented === true)
        let moviesAvailable = this.props.state.movies.filter(c => c.isRented === false)
        return (
            <div>
                <h4>Budget:{this.props.state.budget}$</h4>
                <div><h2> Favorites:</h2></div>
                <div id="favorite-movies">

                    {favoriteMovies.map(f => {
                        return (<Movie rentalChange={this.props.rentalChange} movie={f} key={f.posterUrl} />)
                    })}
                </div>
                <div> <h2>   Movies available: </h2></div>
                <div id="available-movies">

                    {moviesAvailable.map(f => {
                        if(f.title)
                        return (<Movie rentalChange={this.props.rentalChange} movie={f} key={f.posterUrl} />)
                    })}
                </div>
            </div>
        )
    }
}

export default Catalog