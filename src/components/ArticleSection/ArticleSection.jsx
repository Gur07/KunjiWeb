import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const ArticleSection = () => {
  const [articles, setArticles] = useState([]);

  const getFinanceNews = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: `
            (personal finance OR budgeting OR saving OR investment OR financial literacy 
            OR stock market OR mutual funds OR retirement planning OR tax-saving 
            OR wealth management OR credit score OR financial planning)
          `,
          sortBy: "publishedAt",
          language: "en",
          domains: `
            investopedia.com,nerdwallet.com,cnbc.com,marketwatch.com,
            economictimes.indiatimes.com,moneycontrol.com,business-standard.com,
            livemint.com,indiatoday.in,hindustantimes.com
          `,
          pageSize: 20,
          apiKey: API_KEY,
        },
      });
      return response.data.articles;
    } catch (error) {
      console.error("Error fetching finance news:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const newsArticles = await getFinanceNews();
      setArticles(newsArticles);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="ml-40 text-left text-3xl font-bold text-black mb-8">
        Articles and News
      </h1>
      <div className="container w-auto flex flex-wrap justify-center gap-16">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-gray-100 m-2 w-full md:w-auto md:max-w-xs"
          >
            <img
              className="object-cover aspect-square p-2 w-full rounded-xl h-44  md:w-50"
              src={
                article.urlToImage ||
                "https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F4087184%2Fcover_image%2Fretina_500x200%2FUntitled-4e06fb2b6d487f6550add2b1a007847b.png"
              }
              alt={article.title}
            />
            <div className="p-4">
              <h5 className="mb-2 text-xl font-semibold text-gray-900">
                {article.title.slice(0, 50)}
              </h5>
              <p className="mb-3 text-gray-600 text-sm">
                {article.description ? article.description.slice(0, 100) : "   "}
              </p>
              <span className="text-blue-600 hover:text-blue-800">
                Find out more →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticleSection;
