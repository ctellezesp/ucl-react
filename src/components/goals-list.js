import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../firebase/config";
import './styles/index.css';
import swal from 'sweetalert';

export default class GoalsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      goals: [],
      es: [],
      en: [],
      show: []
    }
    this.delete = this.delete.bind(this);
    this.english = this.english.bind(this);
    this.spanish = this.spanish.bind(this);
  }

  componentDidMount(){
    firebase.db.collection("ucl-goals").orderBy('date', 'desc').get()
    .then(res => {
      console.log(res.docs);
      this.setState({
        goals: res.docs,
        es: res.docs.filter(goal => goal.data().lang == "es"),
        en: res.docs.filter(goal => goal.data().lang == "en"),
        show: res.docs
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  english(){
    this.setState({
      show: this.state.en
    });
  }

  spanish(){
    this.setState({
      show: this.state.es
    });
  }

  delete(goal){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this match!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.db.collection("ucl-goals").doc(goal).delete()
        .then(res => {
          swal("Goal Eliminated correctly", {
            icon: "success",
          });
        })
        .catch(err => {
          swal("Error", {
            icon: "error",
          });
        })
      } else {
        swal("You don't deleted this goal");
      }
    });
  }

  render() {
      return (
          <div className="row">
              <div className="col s12 l10 offset-l1">
                <div className="col s8">
                  <a className="waves-effect waves-light btn" onClick={this.english}>English</a>
                  <a className="waves-effect waves-light btn" onClick={this.spanish}>Español</a>
                </div>
                <div className="col s4">
                  <Link to="/create-goals" className="waves-effect waves-light btn right"><i className="material-icons left">add</i>Add Goal</Link>
                </div>
              </div>
              <div className="col s12 l10 offset-l1">
                <div className="card">
                  <table className="striped centered">
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
                      {this.state.show.map((item, index) => {
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
              <div className="fixed-action-btn">
                <Link to="/dashboard" className="btn-floating btn-large red">
                  <i className="large material-icons">home</i>
                </Link>
              </div>
          </div>
      )
  }
}