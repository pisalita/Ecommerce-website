import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        dynamicHeight={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="h-[25rem] md:h-[35rem]">
          <img
            className="h-full object-cover"
            loading="lazy"
            src="..\assets\images\rupixen-com-Q59HmzK38eQ-unsplash.jpg"
          />
        </div>

        <div className="h-[25rem] md:h-[35rem]">
          <img
            className="h-full object-cover"
            loading="lazy"
            src="..\assets\images\tamanna-rumee-eD1RNYzzUxc-unsplash.jpg"
          />
        </div>

        <div className="h-[25rem] md:h-[35rem]">
          <img
            className="h-full object-cover"
            loading="lazy"
            src="..\assets\images\benyafez-studio-g4W3SLjcvMA-unsplash.jpg"
          />
        </div>
      </Carousel>
    </div>
  );
};
