import React, { Component } from 'react';
import './styles/menu.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HighlightsList from './highlights-index';
import Goals from './goals';
import Spanish from './spanish';

export default class Menu extends Component {
    render() {
        return (
            <div className="App">
              <section className="top-nav">
                <div>
                  <h5>{this.props.title}</h5>
                </div>
                <input id="menu-toggle" type="checkbox" />
                <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
              </label>
                <ul className="menu">
                  <li><Link to="/">Highlights</Link></li>
                  <li><Link to="/goals">Goals</Link></li>
                  <li><Link to="/spanish">Español</Link></li>
                </ul>
              </section>
            </div>
        )
    }
}