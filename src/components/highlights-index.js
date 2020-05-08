import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../firebase/config";
import swal from 'sweetalert';
import {Ripple} from 'react-preloaders';
import './styles/index.css';

export default class HighlightsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: [],
      loading: true
    }
  }

  componentDidMount(){
    firebase.db.collection("ucl-highlights").orderBy('date', 'desc').get()
    .then(res => {
      console.log(res.docs);
      this.setState({
        matches: res.docs,
        loading: false
      })
    })
    .catch(err => {
      console.log(err);
      swal({
        title: "¿Reload?",
        text: "Data not found, would you like to recharge?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          window.location.reload();
        } else {
          swal("Gracias por esperar");
        }
      });
    });
  }

  render() {
      return (
        <div className="main">
          <div className="row">
            <div className="col s12 l10 offset-l1">
              <div className="card card-main">
                <table className="centered responsive-table">
                  <thead>
                    <tr>
                        <th>Date</th>
                        <th>Broadcaster</th>
                        <th>Season</th>
                        <th></th>
                        <th>Watch</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.matches.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.data().date}</td>
                          <td><img className="img-index" src={item.data().broadcaster}/></td>
                          <td>{item.data().season}</td>
                          <td>{item.data().title}</td>
                          <td><Link to={`/player/${item.ref.id}`}><i className="material-icons play-icon">play_circle_filled</i></Link></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Ripple customLoading={this.state.loading}  background="#000b24" color="#FFFFFF"/>
        </div>
      );
  }
}