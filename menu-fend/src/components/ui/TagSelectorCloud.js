import React, {Component} from 'react'
import './TagSelectorCloud.css'

export const TagSelectorCloud = class TagSelectorCloud extends Component {
  state = {
    tags: null
  }

  componentWillMount(){
    var tags = this.props.tags.map(tag => {
      tag.selected = false
      return tag
    })

    this.setState({
      tags
    })
  }

  componentDidUpdate(){
  }

  onTagClicked(tag){
    const tags = this.state.tags

    for(let i = 0; i < tags.length; i++){
      if(tags[i] === tag) tags[i].selected = !tags[i].selected
    }

    this.setState({
      tags
    })
  }

  render(){
    return (
      <div className="tag-selector-container tag-selector-cloud">
        {this.props.title && (<h3 className="tag-selector-title">{this.props.title}</h3>)}
        {this.props.tags && this.props.tags.map(tag => (<span className={tag.selected ? "cloud-tag selected" : "cloud-tag"} key={tag.name} onClick={(e) => this.onTagClicked(tag)}>{tag.name}</span>))}
      </div>
    )
  }
}

export const TagSelectorSingleLine = class TagSelectorSingleLine extends TagSelectorCloud {
  render(){
    return(
      <div className="tag-selector-container tag-selector-single-line">
        {this.props.title && (<h3 className="tag-selector-title">{this.props.title}</h3>)}
        {this.props.tags && this.props.tags.map(tag => (<div className={tag.selected ? "cloud-tag selected" : "cloud-tag"} key={tag.name} onClick={(e) => this.onTagClicked(tag)}>{tag.name}</div>))}
      </div>
    )
  }
}
