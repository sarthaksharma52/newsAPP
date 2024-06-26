import React, { Component } from 'react';
import NewsItem from './NewsItem.js';
import Loading from './Loading.js';
import PropTypes from 'prop-types';

let capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
    document.title = `${capitalize(this.props.category)} - NewsMonkey`;
  }
  
  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async (page = 1) => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84ff3da9aa3f412cb946ddc991a74923&page=${page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles || [], // Safeguard against undefined articles
      loading: false,
      page: page,
    });
  }

  nextpage = async () => {
    this.fetchNews(this.state.page + 1);
  }

  prevpage = async () => {
    this.fetchNews(this.state.page - 1);
  }

  render() {
    return (
      <div className='container my-3'>
        <div className="text-center pt-5">
          <h1>NewsMonkey - Top {capitalize(this.props.category)} Headlines</h1>
        </div>
        {this.state.loading && <Loading />}
        <div className="row mb-3 mt-4">
          {!this.state.loading && (this.state.articles.length > 0 ? (this.state.articles.map((element) => {
            return <div className="col-md-4 mb-3" key={element.url}>
              <NewsItem 
                title={element.title ? element.title.slice(0, 45) : ""} 
                description={element.description ? element.description.slice(0, 88) : ""} 
                date={element.publishedAt} 
                author={element.author ? element.author : "unknown"} 
                imageUrl={element.urlToImage} 
                newsUrl={element.url} 
              />
            </div>
          })
          ) : (
            <div>No articles found</div> // Handle case when no articles are found
          ))}
          <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.prevpage}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.nextpage}>Next &rarr;</button>
          </div>
        </div>
      </div>
    );
  }
}
