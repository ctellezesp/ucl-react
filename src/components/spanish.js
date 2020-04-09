import React, { Component } from 'react';
import firebase from "../firebase/config";
import './styles/goals.css';

export default class Spanish extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: '',
      data: []
    }
    this.myFrame = this.myFrame.bind(this);
  }

  componentDidMount(){
    firebase.db.collection("ucl-goals").orderBy('date', 'desc').get()
    .then(res => {
      console.log(res.docs);
      let es = res.docs.filter(goal => {
        return goal.data().lang == 'es';
      });
      console.log(es);
      this.setState({
        data: es,
        current: es[0].data().frame
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  myFrame(val){
    this.setState({
      current: val
    });
    console.log(val);
  }


  render() {
    return (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="video-container" id="play">
              <iframe src={this.state.current} width="640" height="480" allowFullScreen></iframe>
            </div>
          </div>
          <div className="col s12 m12">
            <div className="gallery">
              {this.state.data.map((item, index)=> {
              return(
                <div key={index} className="card center-align card-match" onClick={() => this.myFrame(item.data().frame)}>
                    <div className="card-content">
                      <div className="row center-align">
                          <div className="col s6">
                              <img src={item.data().home} />
                          </div>
                          <div className="col s6">
                              <img src={item.data().away} />
                          </div>
                      </div>
                  </div>
                  <div className="card-action center-align">
                      <span>{item.data().title}</span>
                  </div>
                  <div className="season">{item.data().season}</div>
                </div>
              ) 
              })}
            </div>
          </div>
        </div>
    )
  }
}

