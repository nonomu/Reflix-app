import React, { Component } from 'react';
// import '../styles/fentity.css'
import { Link } from 'react-router-dom'
import { FaPlusCircle, FaMinusCircle,FaSearch } from 'react-icons/fa';
import '../App.css'
import axios from 'axios'


class Movie extends Component {
    constructor() {
        super()
        this.state = {
            render: false
        }
    }
    returnMovie = () => {
        this.props.rentalChange(this.props.movie.id, -3)
    }
    addMovie = () => {
        this.props.rentalChange(this.props.movie.id, 3)
    }
    render() {
        // let fentitiesSelected= this.props.state[this.props.match.params.fentities].find(f => f.name === this.props.match.params.name )
        let movie = this.props.movie

        return (
            <div className="movie">
                <div className="addAndRemove">
                {movie.isRented ? <FaMinusCircle  className="removeMovie" onClick={this.returnMovie} /> :
                <FaPlusCircle  className="addMovie" onClick={this.addMovie} />}
                    
                </div>
                <img className="movie-img" src={movie.posterUrl ? movie.posterUrl : null} alt="image" />
                <Link style={{textDecoration:"none"}} to={"/Catalog/" + movie.title} key={movie.img}>
                    <div className="movie-info">
                        <div className="movie-title">{movie.title}</div>
                        <div className="year-label"> ({movie.year})</div>
                    </div>
                </Link>
            </div>
        )
    }


}

export default Movie;
