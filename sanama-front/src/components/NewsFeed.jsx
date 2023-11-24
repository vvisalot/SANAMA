import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";

const NewsFeed = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=0b60f29bfedd406996d2930eeeb7411f`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setNewsList(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p className="w-[23.5rem] flex flex-col">Loading news...</p>;
  }

  return (
    <div className="w-[23.5rem]">
      <div
        className="text-xl font-bold text-black-500 px-4"
        style={{ color: "#28539E" }}
      >
        Noticias
      </div>
      <div className="flex flex-col">
        {newsList.slice(1, 6).map((news, index) => (
          <NewsItem key={index} news={news} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
