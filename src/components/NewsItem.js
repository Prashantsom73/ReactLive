import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export default class NewsItem extends Component {
  
  render() {
    let {title,description,imagUrl,newsUrl,time,author,source} =  this.props;
    return (
      <div className="card my-3">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'10%',zindex:'1'}}>
          {source}
  </span>
        <img src={imagUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>

            <p className="card-text float-right my-3">Last updated by {author} on {new Date(time).toGMTString()}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
       
        </div>
      </div>
    )
  }
}
