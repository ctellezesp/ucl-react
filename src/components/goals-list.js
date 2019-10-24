import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../firebase/config";
import './styles/index.css';

export default class GoalsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      goals: []
    }
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    firebase.db.collection("ucl-goals").orderBy('date', 'desc').get()
    .then(res => {
      console.log(res.docs);
      this.setState({
        goals: res.docs
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  delete(goal){
    firebase.db.collection("ucl-goals").doc(goal).delete()
    .then(res => {
      console.log(res);
      window.alert("Goal Deleted");
    })
    .catch(err => {
      console.log(err);
      window.alert("Error");
    })
  }

  render() {
      return (
          <div class="row">
              <div class="col s12 l10 offset-l1">
                <table class="striped centered responsive-table">
                  <thead>
                    <tr>
                        <th>Home</th>
                        <th>Away</th>
                        <th>Title</th>
                        <th>Season</th>
                        <th>Language</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Share</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.goals.map((item, index) => {
                      return (<tr key={index}>
                        <td><img src={item.data().home} /></td>
                        <td><img src={item.data().away} /></td>
                        <td>{item.data().title}</td>
                        <td>{item.data().season}</td>
                        <td>{item.data().lang}</td>
                        <td><Link to={`/edit-goals/${item.ref.id}`}><i className="material-icons play-icon">edit</i></Link></td>
                        <td><i className="material-icons menu-icon" onClick={() => this.delete(item.ref.id)}>delete</i></td>
                        <td><Link to={`/share/${item.ref.id}`}><i className="material-icons play-icon">share</i></Link></td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
          </div>
      )
  }
}