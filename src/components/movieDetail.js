import React, { Component } from 'react';
class MovieDetail extends Component {
    render() {

        console.log(this.props.match.params.movieName)
        let movieSelected = this.props.state.movies.find(c => c.title === this.props.match.params.movieName)
        console.log(movieSelected)
        return (
            <div className="movie-details">
                <div>
                    <img className="movie-imgd" src={movieSelected.posterUrl} alt="image" />{movieSelected.title}
                </div>
                <div className="movie-information">
                    <div>{movieSelected.title} - ({movieSelected.year})</div> 
                    <div className="director">{movieSelected.director}</div>
                    <div className="movie-shoredesc">{movieSelected.plot}</div>
                </div>      
            </div>
        )

    }
}
export default MovieDetail;