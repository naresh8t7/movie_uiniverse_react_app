import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';


export const MovieForm = ({ handleSubmit, pristine, reset, submitting, heading, handleSave, handleCancel }) => {
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="title"
                label="Title"
                placeholder="Title of the movie"
                component={FieldInput}
            />


            <Field
                type="number"
                name="year"
                label="year"
                placeholder="Year of the movie"
                component={FieldInput}
            />

            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add Movie' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Reset</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};





const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required Title';
    }

    if (!values.year) {
        errors.year = 'Required Year';
    }
    return errors;
};



export default reduxForm({
    form: 'MovieForm',
    validate
})(MovieForm);
