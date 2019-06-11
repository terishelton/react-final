import React, { Component } from 'react';
import jsonQuery from 'json-query';

// News Source for News Reader app
// Builds out each news source with articles
class NewsSource extends Component {
    render() {
        const articles = Object.keys(this.props.articleData);
        const articleTitle = jsonQuery('[**][title]', { data: this.props.articleData }).value;
        const articleImage = jsonQuery('[**][urlToImage]', { data: this.props.articleData }).value;
        const articleLink = jsonQuery('[**][url]', { data: this.props.articleData }).value;
        const articleDescription = jsonQuery('[**][description]', { data: this.props.articleData }).value;
        const articleAuthor = jsonQuery('[**][author]', { data: this.props.articleData }).value;

        const selectedArticles = articles
            .map((article, i) => {
                return (
                    <article key={i}>
                        {articleImage[i] && 
                            <a href={articleLink[i]}><img src={articleImage[i]} alt={articleTitle[i]} /></a>
                        }
                        <h3><a href={articleLink[i]}>{articleTitle[i]}</a></h3>
                        <p>{articleAuthor[i]}</p>
                        <p>{articleDescription[i]}</p>
                    </article>
                );
            });
        
        // grab the source name from the first article to display at the top
        const getSourceName = jsonQuery('[**][source][name]', { data: this.props.articleData }).value;
        const sourceName = getSourceName[0];

        return ( 
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{sourceName}</h2>
                    {selectedArticles}
                </div>
            </div>
        );
    }
}

export default NewsSource;