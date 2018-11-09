import React, { Component } from 'react'
import AllergenListSimple from './AllergenList'

var baseUrl = "http://localhost:8000/api/v1/"

class AllergenForm extends Component {
  state = {
    value: "",
    acronymValue: "",
    allAllergens: null,
    allAcronyms: null,
    buttonDisabled: true,
    uniqueAcronym: true
  }

  componentWillMount(){
    this.getAllAllergens()
  }

  onNameChanged(e){
    let string = e.target.value
    let matchFound = false
    if((string.trim()).length > 2){
      let {allAllergens : allergens } = this.state
      for(let i = 0; i < allergens.length; i++){
        if(string.trim().toLowerCase() === allergens[i].name.toLowerCase()){
          matchFound = true
          break
        }
      }
      this.setButtonDisabled(matchFound)
    } else {
      if(!this.state.buttonDisabled){
        this.setButtonDisabled(true)
      }
    }

    this.setState({
      value: string
    })
  }

  onAcronymChanged(e){
    let string = e.target.value
    const { allAcronyms } = this.state
    let uniqueAcronym = true

    for(let i = 0; i < allAcronyms.length; i++){
      if(string.trim().toLowerCase() === allAcronyms[i].toLowerCase()) {
        console.log("Matching Acronym found");
        uniqueAcronym = false
        break
      }
    }

    this.setState({
      acronymValue: string.trim(),
      uniqueAcronym
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
      this.setState({
        allAllergens: data,
        allAcronyms: data.map(allergen => allergen.acronym)
      })
    })
  }

  onFormSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    let data = JSON.stringify({ "name": this.state.value, "acronym": this.state.acronymValue });

    // TODO Add some kind of form validation here, perhaps locally with available names?

    let self = this
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
    .then(data => {
      self.getAllAllergens()
    });

    // Clear the form value
    this.setState({
      value: "",
      acronymValue: "",
      uniqueAcronym: true
    })

  }

  onDeleteAllergen(event, allergen){
    var self = this
    fetch(baseUrl + "allergen/" + allergen._id, {
      method: "DELETE",
      body: null,
      headers: {
        "Content-Type": "text/plain"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      self.getAllAllergens()
    });
  }

  isButtonDisabled(){
    return this.state.buttonDisabled || !this.state.uniqueAcronym
  }

  render(){
    let {allAllergens} = this.state
    return (
      <div className={(allAllergens === null) ? "allergen-form-disabled" : "allergen-form"}>
        <h2>Current Allergens</h2>
        <AllergenListSimple allAllergens={allAllergens} config={{canDelete: true, canEdit: false}} onDeleteAllergen={this.onDeleteAllergen.bind(this)}/>
        <h2>Add new Allergen</h2>
        <p>Create a new allergen. The name must be unique</p>
        <form onSubmit={(e) => this.onFormSubmit(e)}>
          <label>
            <p>Allergen:</p>
            <input type="text" disabled={(allAllergens === null) ? true: false } value={this.state.value} onChange={(e) => this.onNameChanged(e)} />
            {allAllergens === null && <p>Database server is offline, try refreshing the page</p>}
          </label>
          <label>
            <p>Acronym:</p>
            <input type="text" disabled={(allAllergens === null) ? true : false} value={this.state.acronymValue} onChange={(e) => this.onAcronymChanged(e)} />
          </label>
          <button type="submit" disabled={this.isButtonDisabled()}>Submit</button>
        </form>
      </div>)
  }

}

export default AllergenForm
