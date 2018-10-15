import React, { Component } from 'react'
import AllergenListSimple from './AllergenList'

var baseUrl = "http://192.168.0.5:8000/api/"

class AllergenForm extends Component {
  state = {
    value: "",
    allAllergens: null,
    buttonDisabled: true
  }

  componentWillMount(){
    this.getAllAllergens()
  }

  onNameChanged(e){
    let string = e.target.value

    if((string.trim()).length > 2){
      let {allAllergens : allergens } = this.state
      for(let i = 0; i < allergens.length; i++){
        if(string.toLowerCase() === allergens[i].name.toLowerCase()){
          this.setButtonDisabled(true)
        } else {
          this.setButtonDisabled(false)
        }
      }
    } else {
      if(!this.state.buttonDisabled){
        this.setButtonDisabled(true)
      }
    }

    this.setState({
      value: string
    })
  }

  setButtonDisabled(bool){
    this.setState({
      buttonDisabled: bool
    })
  }

  onAllergenRemoved(e, allergenIn){
    let allergensList = this.state.allAllergens.filter(allergen => allergen._id !== allergenIn._id);
    this.setState({
      allAllergens: allergensList
    })
  }

  getAllAllergens(){
    fetch(baseUrl + 'allergen',
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

    // TODO Add some kind of form validation here, perhaps locally with available names?

    // Add the new allergen to the online database
    fetch(baseUrl + 'allergen', {
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
    console.log(baseUrl + "allergen/" + allergen._id);

    fetch(baseUrl + "allergen/" + allergen._id, {
      method: "DELETE",
      mode: "cors",
      body: null,
      headers: {
        "Content-Type": "text/plain"
      }
    })
    .then(res => res.json())
    .then(data => console.log(data));
    // TODO implement delete when API is ready :)
    this.getAllAllergens()
  }

  render(){
    let {allAllergens, buttonDisabled} = this.state
    return (
      <div className="allergen-form">
        <h2>Current Allergens</h2>
        <AllergenListSimple allAllergens={allAllergens} config={{canDelete: true, canEdit: false}} onDeleteAllergen={this.onDeleteAllergen.bind(this)}/>
        <h2>Add new Allergen</h2>
        <p>Create a new allergen. The name must be unique</p>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <label>
            Allergen:
            <input type="text" value={this.state.value} onChange={(e) => this.onNameChanged(e)} />
          </label>
          <button type="submit" disabled={buttonDisabled}>Submit</button>
        </form>
      </div>)
  }

}

export default AllergenForm
