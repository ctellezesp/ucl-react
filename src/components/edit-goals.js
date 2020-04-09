import React, { Component } from 'react';
import firebase from "../firebase/config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from 'sweetalert';

export default class EditGoals extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      home: '',
      away: '',
      title: '',
      date: '',
      season: '',
      lang: '',
      frame: '',
      data: [],
    }
    this.edit = this.edit.bind(this);
    this.myHome = this.myHome.bind(this);
    this.myAway = this.myAway.bind(this);
    this.myTitle = this.myTitle.bind(this);
    this.myDate = this.myDate.bind(this);
    this.mySeason = this.mySeason.bind(this);
    this.myLang = this.myLang.bind(this);
    this.myFrame = this.myFrame.bind(this);
  }

  componentDidMount(){
    firebase.db.collection("ucl-goals").doc(this.state.id).get()
    .then(res => {
      this.setState({
        home: res.data().home,
        away: res.data().away,
        title: res.data().title,
        date: res.data().date,
        season: res.data().season,
        lang: res.data().lang,
        frame: res.data().frame,
      });
    })
    .catch(err => {
      console.log(err);
    });

    firebase.db.collection("ucl-teams").orderBy('team', 'asc').get()
    .then(res => {
      this.setState({
        data: res.docs
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  myHome(event){
    this.setState({
      home: event.target.value
    });
  }

  myAway(event){
    this.setState({
      away: event.target.value
    });
  }

  myTitle(event){
    this.setState({
      title: event.target.value
    });
  }

  myDate(event){
    this.setState({
      date: event.target.value.toString()
    });
  }

  myFrame(event){
    this.setState({
      frame: event.target.value
    });
  }

  mySeason(event){
    this.setState({
      season: event.target.value
    });
  }

  myLang(event){
    this.setState({
      lang: event.target.value
    });
  }

  edit(){
    let editData = {
      home: this.state.home,
      away: this.state.away,
      title: this.state.title,
      date: this.state.date,
      season: this.state.season,
      lang: this.state.lang,
      frame: this.state.frame
    }
    firebase.db.collection("ucl-goals").doc(this.state.id).set(editData, {merge: true})
    .then(res => {
      swal("Data Edited!", "Data edited correctly", "success")
      .then(() => {
        this.props.history.push(`/share/${this.state.id}`);
      });
    })
    .catch(err => {
      console.log(err);
      swal("Error", "Please check the configuration", "error");
    })
  }

  render() {
      return (
          <div className="row">
            <div className="card">
              <div className="col s12 l10 offset-l1">
                <div className="card card-dsh">
                  <div className="row">
                    <div className="input-field col s12 l6 center-align">
                      <img src={this.state.home} width="140px" />
                      <select class="browser-default" onChange={this.myHome}>
                          <option value="" disabled selected>Choose new team home</option>
                          {this.state.data.map((item, index) => {
                            return(
                              <option key={index} value={item.data().img}>{item.data().team}</option>
                            )
                          })}
                        </select>
                    </div>
                    <div className="input-field col s12 l6 center-align">
                      <img src={this.state.away} width="140px" />
                      <select class="browser-default" onChange={this.myAway}>
                        <option value="" disabled selected>Choose new team away</option>
                          {this.state.data.map((item, index) => {
                            return(
                              <option key={index} value={item.data().img}>{item.data().team}</option>
                            )
                          })}
                        </select>
                    </div>
                    <div className="input-field col s12 l12">
                      <input id="title" type="text" className="validate" value={this.state.title} onChange={this.myTitle} />
                      <label className="active" htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="date" type="date" className="validate" value={this.state.date} onChange={this.myDate} />
                      <label className="active" htmlFor="date">Date</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="season" type="text" className="validate" value={this.state.season} onChange={this.mySeason} />
                      <label className="active" htmlFor="season">Season</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <select class="browser-default" onChange={this.myLang}>
                          <option value={this.state.lang} disabled selected>{this.state.lang}</option>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                        </select>
                    </div>
                    <div className="input-field col s12 l12">
                      <textarea id="frame" class="materialize-textarea" value={this.state.frame} onChange={this.myFrame}></textarea>
                      <label className="active" htmlFor="frame">Frame</label>
                    </div>
                  </div>
                </div>
                <a class="waves-effect waves-light btn right" onClick={this.edit}><i class="material-icons left">save</i>Edit</a>
              </div>
              <div className="fixed-action-btn">
                <Link to="/dashboard" className="btn-floating btn-large red">
                  <i className="large material-icons">home</i>
                </Link>
              </div>
            </div>
          </div>
      )
  }
}