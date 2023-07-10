import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as movieAction from '../../action/MovieAction';
import MovieList from './MovieList';
import MovieGraph from './MovieGraph'



export class MovieListContainer extends React.Component {

    constructor() {
        super();

        this.state = {selectedMovieTitle: undefined};

        this.handleAddMovie = this.handleAddMovie.bind(this);
        this.handleEditMovie = this.handleEditMovie.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getMoviesAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddMovie() {
        this.props.history.push('/movie');
    }



    handleEditMovie() {
        const selectedMovieTitle = this.state.selectedMovieTitle;

        if (selectedMovieTitle) {
            this.setState({selectedMovieTitle: undefined});
            this.props.history.push(`/movie/${selectedMovieTitle}`);
        }        
    }



    handleDelete() {
        const selectedMovieTitle = this.state.selectedMovieTitle;

        if (selectedMovieTitle) {
            this.setState({selectedMovieTitle: undefined});
            this.props.action.deleteMovieAction(selectedMovieTitle)
                .catch(error => {
                    toastr.error(error);
                });
        }
    }



    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({selectedMovieTitle: row.id});
        }
    }



    render() {
        const { movies } = this.props;

        if (!movies) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Movie Universe</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddMovie}
                            >
                                <i className="fa fa-plus" aria-hidden="true"/> New
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={this.handleEditMovie}
                            >
                                <i className="fa fa-pencil" aria-hidden="true"/> Edit
                            </button>                                

                            <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={this.handleDelete}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}/> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <MovieList movies={movies} handleRowSelect={this.handleRowSelect}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <MovieGraph movies={movies} />
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    movies: state.moviesReducer.movies
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(movieAction, dispatch)

});



export default connect(mapStateToProps, mapDispatchToProps)(MovieListContainer);
