import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL

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
            investopedia.com,nerdwallet.com,forbes.com,cnbc.com,marketwatch.com,
            economictimes.indiatimes.com,moneycontrol.com,business-standard.com,
            livemint.com,indiatoday.in,hindustantimes.com
          `,
          pageSize: 50,
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
    <div className="w-full min-h-screen ">
      <h1 className="text-center text-5xl font-bold text-violet-900 mb-8">
        Articles and News
      </h1>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white border border-blue-200 rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-blue-50 dark:border-violet-700 dark:bg-violet-100 dark:hover:bg-violet-200 m-2"
          >
            <img
              className="object-cover aspect-square p-2 w-full rounded-2xl h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={
                article.urlToImage ||
                "https://assets.toptal.io/images?url=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fblog_post_page%2F4087184%2Fcover_image%2Fretina_500x200%2FUntitled-4e06fb2b6d487f6550add2b1a007847b.png"
              }
              alt={article.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-violet-900">
                {article.title.slice(0, 50)}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-violet-900">
                {article.description
                  ? article.description.slice(0, 100)
                  : "   "}
              </p>
              <span className="text-blue-700 dark:text-violet-800 hover:text-blue-900 dark:hover:text-violet-900">
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
