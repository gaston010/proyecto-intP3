// import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import styles from "./Carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <button className={styles.prev}>Previous</button>,
    nextArrow: <button className={styles.next}>Next</button>,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {data.map((obj) => (
          <div key={obj.id} className={styles.slide}>
            <div className={styles.card}>
              <img src={obj.image} alt={obj.name} className={styles.image} />
              <div className={styles.textContainer}>
                <h2 className={styles.title}>{obj.name}</h2>
                <p className={styles.bio}>{obj.bio}</p>
                <a href={obj.website} className={styles.link}>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
