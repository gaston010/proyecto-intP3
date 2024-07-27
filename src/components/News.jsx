import React from 'react';

// function News() {
//   return (
//     <div>
//       <h1>News</h1>
//       <p>Welcome to the news page!</p>
//     </div>
//   );
// }

// export default News;

function News() {
  const newsData = [
    { title: 'News 1', content: 'This is the content of news 1.' },
    { title: 'News 2', content: 'This is the content of news 2.' },
    { title: 'News 3', content: 'This is the content of news 3.' },
    { title: 'News 4', content: 'This is the content of news 4.' },
    { title: 'News 1', content: 'This is the content of news 1.' },
    { title: 'News 2', content: 'This is the content of news 2.' },
    { title: 'News 3', content: 'This is the content of news 3.' },
    { title: 'News 4', content: 'This is the content of news 4.' },
    { title: 'News 1', content: 'This is the content of news 1.' },
    { title: 'News 2', content: 'This is the content of news 2.' },
    { title: 'News 3', content: 'This is the content of news 3.' },
    { title: 'News 4', content: 'This is the content of news 4.' },
  ];



  return (
    <div className='grid-container'>
      <h1>News</h1>
      <p>Welcome to the news page!</p>
      <div className="news-grid">
        {newsData.map((news, index) => (
          <div key={index} className="news-card">
            <div className='img' />
            {/* <img src={news.image} alt={news.title} style={{ height: '80%', objectFit: 'cover' }} /> */}
            <div className="card-content">
              <h2>{news.title}</h2>
              <p>{news.subtitle}</p>
              <a href={news.link}>Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;