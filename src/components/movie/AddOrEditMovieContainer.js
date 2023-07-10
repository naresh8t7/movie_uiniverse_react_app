import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as movieAction from '../../action/MovieAction';
import MovieForm from './MovieForm';


export class AddOrEditMovieContainer extends React.Component {


    constructor() {
        super();
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }



    componentDidMount() {
        this.props.action.getMovieAction(this.props.match.params.id)
            .catch(error => {
                toastr.error(error);
            });
    }



    handleSave(values) {
        const movie = {
            title: values.title,
            year: values.year,
            tags: values.tags
        };

        this.props.action.saveMovieAction(movie)
            .then(() => {
                toastr.success('Movie saved');
                this.props.history.push('/');
            }).catch(error => {
                toastr.error(error);
            });
    }



    handleCancel(event) {
        event.preventDefault();
        this.props.history.replace('/');
    }



    render() {
        const { initialValues } = this.props;
        const heading = initialValues && initialValues.id ? 'Edit Movie' : 'Add Movie';

        return (
            <div className="container">
                <MovieForm
                    heading={heading}
                    handleSave={this.handleSave}
                    handleCancel={this.handleCancel}
                    initialValues={this.props.initialValues}
                />
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    const title = ownProps.match.params.id; //from the path '/movie/:id'

    if (title && state.selectedMovieReducer.movie && title === state.selectedMovieReducer.movie.title) {
        return {
            initialValues: state.selectedMovieReducer.movie,
        };
    }
};



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators({ ...movieAction }, dispatch)
});



export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditMovieContainer);
