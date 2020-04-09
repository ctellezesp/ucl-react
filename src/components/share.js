import React, { Component } from 'react';
import firebase from "../firebase/config";
import './styles/player.css';

export default class Share extends Component {
  constructor(props){
    super(props);
    console.log(props.match.params.id);
    this.state = {
      id: props.match.params.id,
      data: []
    }
  }

  componentDidMount(){
    firebase.db.collection("ucl-goals").doc(this.state.id).get()
    .then(res => {
      console.log(res);
      this.setState({
        data: res.data()
      });
    })
    .catch(err => {
    console.log(err)
    });
  }

    render() {
        return (
            <div className="row" id="main">
                <div className="col s12 l8">
                  <div className="video-container">
                    <iframe src={this.state.data.frame} width="640" height="480" allowFullScreen></iframe>
                  </div>
                </div>
                <div className="col s12 l4 center-align">
                  <div className="card card-detail">
                    <p><b>{this.state.data.title}</b></p>
                    <div className="divider"></div>
                    <div className="row center-align">
                        <div className="col s4">
                            <img src={this.state.data.home} />
                        </div>
                        <div className="col s4">
                              <span className="team-vs">vs</span>
                        </div>
                        <div className="col s4">
                            <img src={this.state.data.away} />
                        </div>
                    </div>
                    <p>Date: {this.state.data.date}</p>
                    <p>Season: {this.state.data.season}</p>
                </div>
              </div>
            </div>
        )
    }
}