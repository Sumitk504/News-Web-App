import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    
    static defaultProps ={
        country: 'in',
        pageSize:  8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async UpdateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7aa1aa691cb84b09af666e5ba5d9045b&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
            })
    }
    async componentDidMount() {
        this.UpdateNews();
    }

    handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1});
        this.UpdateNews();
    }

    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.UpdateNews();
    }

    render() {
        return (
            <div className="container-fluid col-10 my-3">
                <h1 className="ms-5">NewsDonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row mt-3 ms-5">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element}>
                            <NewsItem  title={element.title ? element.title : ""} description={element.description ? element.description : ""} author={element.author} date={element.publishedAt} imageUrl={element.urlToImage} newUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
