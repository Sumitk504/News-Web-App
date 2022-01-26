import React, { Component } from 'react'

export default   class NewsItem extends Component {
    
    render() {
        let {title, description, imageUrl, newUrl, author, date} = this.props;
        return (
            <div>
                <div className="card" style={{width : '18rem'}}>
                    <img src={!imageUrl?"https://images.hindustantimes.com/img/2021/09/25/550x309/523033e27abd4a0a93fa9f40cb03c4d4-523033e27abd4a0a93fa9f40cb03c4d4-1_1619482395662_1625703017701_1632536493201.jpg":imageUrl}  className="card-img-top" alt="..." />
                    <div  className="card-body">
                        <h5  className="card-title">{title}</h5>
                        <p  className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknow" :author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
