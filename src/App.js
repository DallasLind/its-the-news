import React, { Component } from "react";
import "./App.css";
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=fa57b51843bc4bfb9e79d6723e7b7e6a";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(data => data.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            articles: result.articles
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1>It's the news!</h1>
          </header>
          <ul>
            {articles.map(article => (
              <li>
                <img className="Pic" src={`${article.urlToImage}`} />
                <h6>{article.publishedAt}</h6>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
