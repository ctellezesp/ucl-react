import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/dashboard.css';

export default class Dashboard extends Component {
    render(){
        return(<div className="row">
            <div className="col s12 l8 offset-l2">
                <div className="row">
                    <div className="col s12 l6 center-align">
                        <Link to="/create-goals">
                            <div className="card">
                                <h5 className="items">Create Goals</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 l6 center-align">
                        <Link to="/goals-list">
                            <div className="card">
                                <h5 className="items">Goals List</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 l12 center-align">
                        <Link to="/create">
                            <div className="card">
                                <h5 className="items">Create Highlights</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 l6 center-align">
                        <Link to="/add-teams">
                            <div className="card">
                                <h5 className="items">Add Teams</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col s12 l6 center-align">
                        <Link to="/teams">
                            <div className="card">
                                <h5 className="items">Teams List</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>)
    }
}