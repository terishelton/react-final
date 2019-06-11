import React, { Component } from 'react';
import NewsCards from './NewsCards';

class NewsApp extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            allSources: [],
            articleData: {},
            isLoading: true,
            hasError: false
        }
    }

    addUserSource = (e) => {
        e.preventDefault();
        const selectedSource = e.target.value;

        if (Object.keys(this.state.articleData).includes(selectedSource)) {
            alert('You have already selected this news source.');
            return;
        }

        this.setState(prevState => {
            return {
                articleData: {...prevState.articleData, [`${selectedSource}`]: '' }
            };
        });
        this.getArticles(selectedSource);
    }

    getArticles = (sourceID) => {
        fetch(`https://microservice-top5.terishelton.now.sh/${sourceID}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState(prevState => {

                    const newArticleData = {...prevState.articleData, [`${sourceID}`]: data.data.articles};

                    return {
                        articleData: newArticleData,
                        isLoading: false
                    };
                });
            })
            .catch(error => {
                this.setState({
                    hasError: true,
                    isLoading: false
                });
        });
    }

    componentDidMount() {
        // get all the sources for search
        fetch(`https://microservice-top5.terishelton.now.sh/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ 
                    allSources: data.sources.sources,
                    isLoading: false
                });
            })
            .catch(error => {
                this.setState({
                    hasError: true,
                    isLoading: false
                });
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }
  
        if (this.state.hasError) {
            return <div>ERROR, please reload and try again</div>;
        }

        const sourceList = this.state.allSources
            .map((source, index) => {
                return (
                    <option key={index} value={source.id}>{source.name}</option>
                );
            });

        return (
            <div id="NewsReader">
                <div className="NewsSourceIntro">
                    <p>Choose your favorite news source from the dropdown or select from a popular source below.</p>
                </div>

                <select className="form-control" onChange={this.addUserSource}>
                    <option value="default">Choose a source...</option>
                    {sourceList}
                </select>
                
                <div id="NewsSourceList">
                    <p>Popular choices:</p>
                    <button className="btn" onClick={this.addUserSource} value="cnn">CNN</button>
                    <button className="btn" onClick={this.addUserSource} value="msnbc">MSNBC</button>
                    <button className="btn" onClick={this.addUserSource} value="the-new-york-times">New York Times</button>
                    <button className="btn" onClick={this.addUserSource} value="the-washington-post">Washington Post</button>
                </div>

                <NewsCards 
                    articleData={this.state.articleData}
                />
           </div>
           );
     }
}

export default NewsApp;