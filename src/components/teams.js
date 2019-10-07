import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../firebase/config";
//import './styles/index.css';

export default class TeamsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      teams: []
    }
  }

  componentDidMount(){
    firebase.db.collection("ucl-teams").orderBy('team', 'asc').get()
    .then(res => {
      console.log(res.docs);
      this.setState({
        teams: res.docs
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
                        <th>Name</th>
                        <th>Abr</th>
                        <th>Edit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.teams.map((item, index) => {
                      return (<tr key={index}>
                        <td>{item.data().team}</td>
                        <td>{item.data().abr}</td>
                        <td><Link to={`/edit-teams/${item.ref.id}`}><i className="material-icons play-icon">edit</i></Link></td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
          </div>
      )
  }
}