import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

export const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating: incommingRating,
}) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(incommingRating.rate);

  const [hasNextDayDelivery, setHasNextDayDelivery] = useState(
    Math.random() < 0.5
  );

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasNextDayDelivery,
    };

    dispatch(addToCart(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-lg">
      <p className="flex justify-end text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(Math.round(rating))
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-cs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} />
      </div>

      {hasNextDayDelivery && (
        <div className="flex items-center space-x-2 -mt-4 mb-2">
          <img
            className="w-7"
            src="..\assets\images\logistics-delivery-truck-and-clock.png"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToCart} className="mt-auto button">
        Add to Cart
      </button>
    </div>
  );
};
