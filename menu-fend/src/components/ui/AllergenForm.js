import React, { Component } from 'react'

class AllergenForm extends Component {
  state = {
    value: ""
  }

  onNameChanged(e){
    let string = e.target.value
    this.setState({
      value: string
    })
    console.log("Change!!!");
  }

  onFormSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    console.log("Submitting a form!");
    let data = { name: this.state.value }
    let url = 'http://localhost:8000/api/new-allergen'
    let dataToSend = {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': "application/json"
      }
    }
    console.log(dataToSend);

    fetch(url, dataToSend)
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
    })
  }

  render(){
    return (
      <div className="allergen-form">
        <h2>Add new Allergen</h2>
        <p>Create a new allergen. The name must be unique</p>
        <form>
          <label>
            Allergen:
            <input type="text" value={this.state.value} onChange={(e) => this.onNameChanged(e)} />
          </label>
          <button onClick={(e) => this.onFormSubmit(e)}>Submit</button>
        </form>
      </div>)
  }

}

export default AllergenForm
