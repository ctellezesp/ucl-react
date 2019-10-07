import React, { Component } from 'react';
import firebase from "../firebase/config";

export default class EditTeams extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      team: '',
      abr: '',
      img: ''
    }
    this.edit = this.edit.bind(this);
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


  componentDidMount(){
    firebase.db.collection("ucl-teams").doc(this.state.id).get()
    .then(res => {
        console.log(res.data());
        this.setState({
            team: res.data().team,
            abr: res.data().abr,
            img: res.data().img
        })
    })
    .catch(err => {
        console.log(err);
    });
  }

  edit(){
    const editData = {
      team: this.state.team,
      abr: this.state.abr,
      img: this.state.img
    };
    firebase.db.collection("ucl-teams").doc(this.state.id).set(editData, {merge: true})
    .then(res => {
      console.log(res);
      window.alert("Data edited succesfully");
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
              <input id="team" type="text" className="validate" value={this.state.team} onChange={this.myTeam}/>
              <label htmlFor="team">Team Name</label>
            </div>
            <div className="input-field col s12 l4">
              <input id="abr" type="text" className="validate" value={this.state.abr} onChange={this.myAbr} maxLength="3"/>
              <label htmlFor="abr">Team Abreviaton</label>
            </div>
            <div className="input-field col s12 l12">
              <input id="img" type="text" className="validate" value={this.state.img} onChange={this.myImg}/>
              <label htmlFor="img">Team Logo</label>
            </div>
          </div>
          <a className="waves-effect waves-light btn right" onClick={this.edit}><i className="material-icons left">save</i>Save</a>
        </div>
        <div className="col s12 l4 center-align">
          <img src={this.state.img} width="140px" height="auto" />
        </div>
      </div>);
  }
}