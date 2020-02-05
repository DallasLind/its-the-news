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

  formatDate(date) {
    let time = new Date(date);
    let year = time.getFullYear();
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let month = time.getMonth() + 1;
    let composedTime =
      day +
      "/" +
      month +
      "/" +
      year +
      " | " +
      hour +
      ":" +
      (minute < 10 ? "0" + minute : minute);
    return composedTime;
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
                <h6>{this.formatDate(article.publishedAt)}</h6>
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
