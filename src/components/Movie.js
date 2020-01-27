import React, { Component } from 'react';
// import '../styles/fentity.css'
import { Link } from 'react-router-dom'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import '../App.css'

class Movie extends Component {
    returnMovie = async () => {
        let user = this.props.user
        let movie= this.props.movie
        let flag = await this.props.rentalChange(user.id, movie.id, user.budget,"return")
        if (flag) {
            await this.props.getUserFavorites()
        }
    }
    addMovie = async () => {
        let user = this.props.user
        let movie= this.props.movie
        let flag = await this.props.rentalChange(user.id,movie.id , user.budget,"rent")
        if (flag) {
            await this.props.getUserFavorites()
        }
    }
    render() {
        let movie = this.props.movie
        return (
            <div className="movie">
                <div className="addAndRemove">
                    {movie.isRented ? <FaMinusCircle className="removeMovie" onClick={this.returnMovie} /> :
                        <FaPlusCircle className="addMovie" onClick={this.addMovie} />}
                </div>
                <img className="movie-img" src={movie.image} alt="image" />
                <Link style={{ textDecoration: "none" }} to={"/Catalog/" + movie.title} key={movie.img}>
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
