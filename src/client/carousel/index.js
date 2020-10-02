import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
import Card from '../card'

export default function App({ products }) {
  return (
    <InfiniteCarousel
      breakpoints={[
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]}
      dots={true}
      showSides={true}
      sidesOpacity={0.5}
      sideSize={0.1}
      slidesToScroll={4}
      slidesToShow={4}
      scrollOnDevice={true}
    >
      {
        products.map((product, key) => <div key={key}>
          <Card product={product} />
        </div>)
      }
    </InfiniteCarousel>
  );
}
