import React, { Component } from 'react';
import './styles/menu.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HighlightsList from './highlights-index';
import Goals from './goals';
import Spanish from './spanish';

export default class Menu extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <nav className="blue">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo hide-on-med-and-down">{this.props.title}</a>
                        <a href="#!" className="brand-logo hide-on-large-only">UCL</a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/">Highlights</Link></li>
                            <li><Link to="/goals">Goals</Link></li>
                            <li><Link to="/spanish">Español</Link></li>
                        </ul>
                        <ul className="hide-on-large-only tabs tabs-fixed-width tab-demo z-depth-1 mobile">
                            <li className="tab"><Link to="/" className="active">Highlights</Link></li>
                            <li className="tab"><Link to="/goals">Goals</Link></li>
                            <li className="tab"><Link to="/spanish">Español</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}