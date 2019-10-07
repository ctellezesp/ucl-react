import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../firebase/config";
import './styles/index.css';

export default class HighlightsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: []
    }
  }

  componentDidMount(){
    firebase.db.collection("ucl-highlights").orderBy('date', 'desc').get()
    .then(res => {
      console.log(res.docs);
      this.setState({
        matches: res.docs
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  render() {
      return (
          <div class="row">
              <div class="col s12 l10 offset-l1">
                <table class="striped centered responsive-table">
                  <thead>
                    <tr>
                        <th>Date</th>
                        <th>Broadcaster</th>
                        <th>Season</th>
                        <th></th>
                        <th>Watch</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.matches.map((item, index) => {
                      return (<tr key={index}>
                        <td>{item.data().date}</td>
                        <td><img src={item.data().broadcaster}/></td>
                        <td>{item.data().season}</td>
                        <td>{item.data().title}</td>
                        <td><Link to={`/player/${item.ref.id}`}><i className="material-icons play-icon">play_circle_filled</i></Link></td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
          </div>
      )
  }
}