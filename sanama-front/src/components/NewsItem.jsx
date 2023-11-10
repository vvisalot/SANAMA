import React from "react";

const NewsItem = ({ news }) => {
  return (
    <div className="news-item">
      <h3>{news.title}</h3>
      <img src={news.urlToImage} alt={news.title} />
      <p>{news.description}</p>
      <a href={news.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsItem;
