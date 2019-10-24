import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Routes
import HighlightsList from './components/highlights-index';
import EditHighlights from './components/edit';
import CreateHighlights from './components/create';
import Menu from './components/menu';
import Goals from './components/goals';
import Spanish from './components/spanish';
import CreateGoals from './components/create-goals';
import EditGoals from './components/edit-goals';
import Player from './components/player';
import AddTeams from './components/add-teams';
import EditTeams from './components/edit-teams';
import TeamsList from './components/teams';
import GoalsList from './components/goals-list';
import Dashboard from './components/dashboard';
import Share from './components/share';
import HighlightsPanel from './components/highlights-list';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'Champions League'
        }
    }

    render() {
        return (
            <Router>
                <Menu title={this.state.title}></Menu>
                <Route path="/" exact component={HighlightsList} />
                <Route path="/highlights-panel" exact component={HighlightsPanel} />
                <Route path="/edit/:id" component={EditHighlights} />
                <Route path="/create" component={CreateHighlights} />
                <Route path="/goals-list" component={GoalsList} />
                <Route path="/goals" component={Goals} />
                <Route path="/spanish" component={Spanish} />
                <Route path="/create-goals" component={CreateGoals} />
                <Route path="/edit-goals/:id" component={EditGoals} />
                <Route path="/share/:id" component={Share} />
                <Route path="/player/:id" component={Player} />
                <Route path="/teams" component={TeamsList} />
                <Route path="/add-teams" component={AddTeams} />
                <Route path="/edit-teams/:id" component={EditTeams} />
                <Route path="/dashboard" component={Dashboard} />
            </Router>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);