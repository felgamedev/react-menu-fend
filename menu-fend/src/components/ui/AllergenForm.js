import React, { Component } from 'react'
import AllergenListSimple from './AllergenList'

class AllergenForm extends Component {
  state = {
    value: "",
    allAllergens: null
  }

  componentWillMount(){
    this.getAllAllergens()
  }

  onNameChanged(e){
    let string = e.target.value
    this.setState({
      value: string
    })
  }

  onAllergenRemoved(e, allergenIn){
    console.log(allergenIn.name);
    let allergensList = this.state.allAllergens.filter(allergen => allergen._id !== allergenIn._id);
    console.log(allergensList);
    this.setState({
      allAllergens: allergensList
    })
  }

  getAllAllergens(){
    fetch('http://192.168.0.5:8000/api/allergen',
    { mode: "cors", headers: {"Content-type" : "application/json"}}
    )
    .then(response => response.json())
    .then(data => {
      console.log("Loading data from API");
      this.setState({
        allAllergens: data
      })
    })

    this.setState({
      userAllergens: this.props.userAllergens
    })
  }

  onFormSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    console.log("Submitting a form!");
    let data = JSON.stringify({ "name": this.state.value });
    let url = 'http://192.168.0.5:8000/api/allergen';

    // TODO Add some kind of form validation here, perhaps locally with available names?

    // Add the new allergen to the online database
    fetch(url, {
      method: "POST",
      mode: "cors",
      body: data,
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => console.log(data));

    // Clear the form value
    this.setState({
      value: ""
    })

    this.getAllAllergens()
  }

  onDeleteAllergen(event, allergen){
    console.log("Delete! Kapow! " + allergen.name)
    // TODO implement delete when API is ready :)
  }

  render(){
    let {allAllergens} = this.state
    return (
      <div className="allergen-form">
        <h2>Current Allergens</h2>
        <AllergenListSimple allAllergens={allAllergens} config={{canDelete: true, canEdit: false}} onDelete={this.onDeleteAllergen}/>
        <h2>Add new Allergen</h2>
        <p>Create a new allergen. The name must be unique</p>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <label>
            Allergen:
            <input type="text" value={this.state.value} onChange={(e) => this.onNameChanged(e)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>)
  }

}

export default AllergenForm
