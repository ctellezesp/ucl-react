import React, { Component } from 'react';

export default class EditGoals extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s12 l10 offset-l1">
                  <div className="row">
                    <div className="input-field col s12 l12">
                      <input id="title" type="text" className="validate" />
                      <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="date" type="date" className="validate" />
                      <label htmlFor="date">Date</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="season" type="text" className="validate" />
                      <label htmlFor="season">Season</label>
                    </div>
                    <div className="input-field col s12 l4">
                      <input id="season" type="text" className="validate" />
                      <label htmlFor="season">Season</label>
                    </div>
                    <div className="input-field col s12 l12">
                        <label>Language</label>
                        <select class="browser-default">
                          <option value="" disabled selected>Choose your language</option>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                        </select>
                    </div>
                  </div>
                  <a class="waves-effect waves-light btn right"><i class="material-icons left">save</i>Save</a>
                </div>
            </div>
        )
    }
}