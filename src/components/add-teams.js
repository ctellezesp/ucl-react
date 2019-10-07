import React, { Component } from 'react';
import firebase from "../firebase/config";

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
    console.log(this.state);
    firebase.db.collection("ucl-teams").add(this.state)
    .then(res => {
      console.log(res);
      window.alert("Team added Correctly")
    })
    .catch(err => {
      console.log(err);
      window.alert("Error");
    });
  }

  render(){
    return(
      <div className="row">
        <div className="col s12 l8">
          <div className="row">
            <div className="input-field col s12 l8">
              <input id="team" type="text" className="validate" onChange={this.myTeam}/>
              <label htmlFor="team">Team Name</label>
            </div>
            <div className="input-field col s12 l4">
              <input id="abr" type="text" className="validate" onChange={this.myAbr} maxlength="3"/>
              <label htmlFor="abr">Team Abreviaton</label>
            </div>
            <div className="input-field col s12 l12">
              <input id="img" type="text" className="validate" onChange={this.myImg}/>
              <label htmlFor="img">Team Logo</label>
            </div>
          </div>
          <a className="waves-effect waves-light btn right" onClick={this.save}><i className="material-icons left">save</i>Save</a>
        </div>
        <div className="col s12 l4 center-align">
          <img src={this.state.img} width="300px" height="auto" />
        </div>
      </div>);
  }
}