import React, { Component } from 'react';
import firebase from "../firebase/config";
import './styles/player.css';

export default class Player extends Component {
  constructor(props){
    super(props);
    console.log(props.match.params.id);
    this.state = {
      id: props.match.params.id,
      data: {}, 
      items: []
    }
  }

  componentDidMount(){
    firebase.db.collection("ucl-highlights").doc(this.state.id).get()
    .then(res => {
      console.log(res.data());
      this.setState({
        data: res.data()
      });
      //console.log(res.data().matches.split('\n'));
      this.setState({
        items: res.data().matches.split('\n')
      });
      console.log(this.state.items);
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
                  <p>{this.state.data.date}</p>
                  <p>Matches:</p>
                  {this.state.items.map((w, index) => {
                    return (
                      <div>
                        <span key={index}>{w}</span>
                        <br></br>
                      </div>
                    )
                  })}
                </div>
              </div>
          </div>
        )
    }
}