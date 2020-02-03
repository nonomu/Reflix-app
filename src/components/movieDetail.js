import React, { Component } from 'react';
import HdIcon from '@material-ui/icons/Hd';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';
let dotenv = require('dotenv')
dotenv.config()

class MovieDetail extends Component {
    constructor() {
        super()
        this.state = {
            trailerId: "",
            renderTrailer: false
        }
    }
    componentDidMount = async () => {
        let movieName = this.props.match.params.movieName
        try {
            let trailer = await Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieName}+trailer&key=${process.env.REACT_APP_NOT_SECRET_CODE}`)
            let videoId = trailer.data.items[0].id.videoId
            this.setState({ trailerId: videoId })
        }
        catch (e) {
            console.log(e.message)
        }
    }
    renderTrailer = () => {
        let render = this.state.renderTrailer
        this.setState({ renderTrailer: !render })
    }
    render() {
        console.log(process.env)
        let movieSelected = this.props.state.movies.find(c => c.title === this.props.match.params.movieName)
        let renderTrailer = this.state.renderTrailer
        console.log(movieSelected)
        return (

            movieSelected ?
                <div className="movie-details">
                    {renderTrailer ?
                        <div className="movie-trailer" style={{ color: "white", margin: "auto" }}>
                            <CloseIcon onClick={this.renderTrailer} />
                            {this.state.trailerId ? <div ><iframe className="trailer"
                                src={`https://www.youtube.com/embed/${this.state.trailerId}`}>
                            </iframe></div> : null}
                        </div> :
                        <div className="movie-information" style={{ color: "white", margin: "auto", gridAutoColumns: "auto" }}>
                            <img className="movie-imgd" src={movieSelected.image} alt="image" />
                            <div className="basic-info"style={{ fontSize: "30px",  }}><span style={{color: "rgba(200, 8, 8, 0.876)"}}> {movieSelected.title} - ({movieSelected.year}) </span>
                            <span style={{ fontSize: "15px" }}>{movieSelected.runtime} minutes</span>
                                 <p className="director"><span style={{ color: "rgba(200, 8, 8, 0.876)"}} >Director:</span> {movieSelected.director}</p>
                                <p className="actors"><span style={{ color: "rgba(200, 8, 8, 0.876)"}} >Actors: </span> {movieSelected.actors}</p>
                                <div className="movie-shoredesc"><span style={{ color: "rgba(200, 8, 8, 0.876)"}} >Plot: </span>{movieSelected.plot}
                                </div>
                                <HdIcon style={{fontSize:"30px"}} onClick={this.renderTrailer} />
                            </div>
                        </div>}
                </div> : null
        )

    }
}
export default MovieDetail;