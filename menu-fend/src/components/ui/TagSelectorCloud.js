import React, {Component} from 'react'
import './TagSelectorCloud.css'

class TagSelectorCloud extends Component {
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
      <div className="tag-selector-cloud">
        {this.props.title && (<h3 className="cloud-title">{this.props.title}</h3>)}
        {this.props.tags && this.props.tags.map(tag => (<span className={tag.selected ? "cloud-tag selected" : "cloud-tag"} key={tag.name} onClick={(e) => this.onTagClicked(tag)}>{tag.name}</span>))}
      </div>
    )
  }
}

export default TagSelectorCloud
