import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div className='my-3'>
        <div class="card-deck">
          <div className="card" style={{ width: "18rem" }}>
            <img src={!imageUrl ? "https://assets2.cbsnewsstatic.com/hub/i/r/2024/05/27/72f6d0fb-4e42-4737-8752-441fedab9c2b/thumbnail/1200x630/aff28b6b26d330addd13b5707be2aea7/ap24148531810639.jpg?v=83093a0dd27502f0a52cd68b1c5b8b6e" : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className='card-text'><small className='text-muted'>By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
              <div className="text-center">
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
