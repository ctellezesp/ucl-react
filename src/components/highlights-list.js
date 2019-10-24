import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "../firebase/config";
import './styles/index.css';
import swal from 'sweetalert';

export default class HighlightsPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      matches: []
    }
  }

  componentDidMount(){
    firebase.db.collection("ucl-highlights").orderBy('date', 'desc').get()
    .then(res => {
      this.setState({
        matches: res.docs
      })
    })
    .catch(err => {
      console.log(err);
    });
  }

  delete(highlights){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this match!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.db.collection("ucl-highlights").doc(highlights).delete()
        .then(res => {
          swal("Highlight Eliminated correctly", {
            icon: "success",
          });
        })
        .catch(err => {
          swal("Error", {
            icon: "error",
          });
        })
      } else {
        swal("You don't deleted this highlight");
      }
    });
  }

  render() {
      return (
          <div className="row">
              <div className="col s12 l10 offset-l1">
                <table className="striped centered responsive-table">
                  <thead>
                    <tr>
                        <th>Date</th>
                        <th>Broadcaster</th>
                        <th>Season</th>
                        <th></th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.matches.map((item, index) => {
                      return (<tr key={index}>
                        <td>{item.data().date}</td>
                        <td><img src={item.data().broadcaster}/></td>
                        <td>{item.data().season}</td>
                        <td>{item.data().title}</td>
                        <td><Link to={`/edit/${item.ref.id}`}><i className="material-icons play-icon">edit</i></Link></td>
                        <td><i className="material-icons play-icon" onClick={() => this.delete(item.ref.id)}>delete</i></td>
                      </tr>)
                    })}
                  </tbody>
                </table>
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