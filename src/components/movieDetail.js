import React, { Component } from 'react';
import Axios from 'axios';
let dotenv = require('dotenv')
dotenv.config()

class MovieDetail extends Component {
    constructor() {
        super()
        this.state={
            trailerId:""
        }
    }
    componentDidMount = async () => {
        let movieName=this.props.match.params.movieName
        try{
        let trailer = await Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieName}+trailer&key=${process.env.REACT_APP_NOT_SECRET_CODE}`)
        let videoId=trailer.data.items[0].id.videoId
        this.setState({trailerId: videoId})
        }
       catch(e) {
           console.log(e.message)
        }
    }
    render() {
        console.log(process.env)
        let movieSelected = this.props.state.movies.find(c => c.title === this.props.match.params.movieName)
        console.log(movieSelected)
        return (
            
            movieSelected ?
                <div className="movie-details">
                    <div style={{color:"white"}}>
                        <div>{movieSelected.title} - ({movieSelected.year})</div>
                        <img className="movie-imgd" src={movieSelected.image} alt="image" />
                    </div>
                    <div className="movie-information">
                        
                        <div className="director">{movieSelected.director}</div>
                        <div className="movie-shoredesc">{movieSelected.plot}</div>
                       {this.state.trailerId? <div ><iframe className="trailer"
                            src={`https://www.youtube.com/embed/${this.state.trailerId}`}>
                        </iframe></div>:null}
                    </div>
                </div> : null
        )

    }
}
export default MovieDetail;