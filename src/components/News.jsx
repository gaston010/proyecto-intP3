import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// import { Carousel } from '@react-spring/web';
import { useSpringCarousel } from 'react-spring-carousel'
import { element } from 'prop-types';

function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cookie = Cookies.get('authToken');
        const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/artists/?format=json', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          data.forEach((item) => {
            if (item.image === null) {
              item.image = 'src/assets/underweb.jpeg';
            }
          });
        setNewsData(data);
        }
      } catch (error) {
        console.error('Error fetching artist news data:', error);
      }
    };
    array.forEach(element => {
      
    });
    fetchData().then((d) => {
      for (let index = 0; index < d.length; index++) {
        const obj = d[index]; ;
        element =
            {
              id: obj.id,
              renderItem: (
                <div key={obj.id} className="news-card">
                <div className='img'>
                  <img src={obj.image} alt={obj.name} />
                </div>
                <div className="card-content">
                  <h2>{obj.name}</h2>
                  <p>{obj.bio}</p>
                  <a href={obj.website}>Learn More</a>
                </div>
              </div>
              )
            };
        
          let carouselObj = useSpringCarousel(element);
          newsData.push(carouselObj);
          debugger;
      }
    });
  }, []);


  return (
    <div className='grid-container'>
      <h1>News</h1>
      <p>Welcome to the news page!</p>

      
      <div className="news-grid">
        {newsData.map((news) => (
          <div key={news.id} className="news-card">
            <div className='img'>
              <img src={news.image} alt={news.name} />
            </div>
            <div className="card-content">
              <h2>{news.name}</h2>
              <p>{news.bio}</p>
              <a href={news.website}>Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;