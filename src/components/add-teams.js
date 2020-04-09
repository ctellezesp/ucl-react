import React, { Component } from 'react';
import firebase from "../firebase/config";
import swal from 'sweetalert';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class AddTeams extends Component {
  constructor(props){
    super(props);
    this.state = {
      team: '',
      abr: '',
      img: ''
    }
    this.save = this.save.bind(this);
    this.myTeam = this.myTeam.bind(this);
    this.myAbr = this.myAbr.bind(this);
    this.myImg = this.myImg.bind(this);
  }

  myTeam(event){
    this.setState({
      team: event.target.value
    });
  }

  myAbr(event){
    this.setState({
      abr: event.target.value
    });
  }

  myImg(event){
    this.setState({
      img: event.target.value
    });
  }

  save(){
    firebase.db.collection("ucl-teams").add(this.state)
    .then(res => {
      swal("Team Added", "Team added correctly", "success")
      .then(() => {
        this.props.history.push('/teams');
      });
    })
    .catch(err => {
      console.log(err);
      swal("Error", "An error ocurred", "error");
    });
  }

  render(){
    return(
      <div className="row">
        <div className="card">
          <div className="col s12 l8">
            <div className="card card-dsh">
              <div className="row">
                <div className="input-field col s12 l8">
                  <input id="team" type="text" className="validate" onChange={this.myTeam}/>
                  <label htmlFor="team">Team Name</label>
                </div>
                <div className="input-field col s12 l4">
                  <input id="abr" type="text" className="validate" onChange={this.myAbr} maxLength="3"/>
                  <label htmlFor="abr">Team Abreviaton</label>
                </div>
                <div className="input-field col s12 l12">
                  <input id="img" type="text" className="validate" onChange={this.myImg}/>
                  <label htmlFor="img">Team Logo</label>
                </div>
              </div>
              </div>
            <a className="waves-effect waves-light btn right" onClick={this.save}><i className="material-icons left">save</i>Save</a>
          </div>
          <div className="col s12 l4 center-align">
            <div className="card">
              <img src={this.state.img} width="90%" height="auto" />
            </div>
          </div>
          <div className="fixed-action-btn">
            <Link to="/dashboard" className="btn-floating btn-large red">
              <i className="large material-icons">home</i>
            </Link>
          </div>
        </div>
      </div>);
  }
}