import React, { Component } from 'react';
import NewsSource from './NewsSource';

class NewsCards extends Component {
    render() {
        const cards = Object.keys(this.props.articleData)
            .reverse().map((source, index) => {
                return (
                    <NewsSource 
                        key={index}
                        index={index}
                        source={source}
                        articleData={this.props.articleData[source]}
                    />
                );
        });

        return(
            <div className="NewsCards">
                {cards}
            </div>
        );
    }
}

export default NewsCards;