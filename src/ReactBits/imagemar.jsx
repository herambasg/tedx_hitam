import React from "react";
import Marquee from "react-fast-marquee";
import "./ImageScrollQueue.css";

const images = [
  { id: 1, img: "https://tedxhitam.com/home_page/1" },
  { id: 2, img: "https://tedxhitam.com/home_page/2" },
  { id: 3, img: "https://tedxhitam.com/home_page/3" },
  { id: 4, img: "https://tedxhitam.com/home_page/4" },
  { id: 5, img: "https://tedxhitam.com/home_page/5" },
  { id: 6, img: "https://tedxhitam.com/home_page/6" },
  { id: 7, img: "https://tedxhitam.com/home_page/7" },
  { id: 8, img: "https://tedxhitam.com/home_page/8" },
  { id: 9, img: "https://tedxhitam.com/home_page/9" },
  { id: 10, img: "https://tedxhitam.com/home_page/10" },
  { id: 11, img: "https://tedxhitam.com/home_page/11" },
  { id: 12, img: "https://tedxhitam.com/home_page/12" },
  { id: 13, img: "https://tedxhitam.com/home_page/13" },
];

const ImageScrollQueue = () => {
  return (
    <div className="scroll-wrapper">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        direction="left"
        loop={0}
      >
        {images.map((img, index) => (
          <div className="image-box" key={index}>
            <img src={img.img} alt={`scroll-${index}`} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ImageScrollQueue;
