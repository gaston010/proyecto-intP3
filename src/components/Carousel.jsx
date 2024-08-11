// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


const Carousel = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>,
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="slider-container">
      <Slider {...settings} className="max-w-full" >
        {data.map((obj) => (
          <div key={obj.rank} className="p-4 ">
            <div className="shadow-md rounded-lg">
              <div className={`card ${darkTheme ? "dark-theme" : "light-theme"}`}>
                <img
                  src={obj.image}
                  alt={obj.name}
                  className="object-cover w-full h-full"
                  style={{ height: "200px" }}
                  />
                <div className="p-4 flex flex-row items-center">
                  <h1 className="text-5xl">{obj.rank}</h1>
                  <h2 className="text-sm font-bold mb-2">{obj.name}</h2>

                </div>
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
      name: PropTypes.string,
      image: PropTypes.string,
      rank: PropTypes.number,
    })
  ),
};

export default Carousel;
