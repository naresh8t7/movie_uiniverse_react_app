import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MovieListContainer from './movie/MovieListContainer';
import AddOrEditMovieContainer from './movie/AddOrEditMovieContainer';

const App = () => {
    return (
        <div >
            <Router>
                <div>

                    <Switch>
                        <Route exact path="/" component={MovieListContainer} />
                        <Route exact path="/movie" component={AddOrEditMovieContainer} />
                        <Route path="/movie/:id" component={AddOrEditMovieContainer} />
                    </Switch>

                </div>

            </Router>
        </div>
    );
};


export default App;
