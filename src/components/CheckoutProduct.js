import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasNextDayDelivery,
}) => {
  const dispatch = useDispatch();

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

  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle Section */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} />

        {hasNextDayDelivery && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-7"
              src="..\assets\images\logistics-delivery-truck-and-clock.png"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day delivery</p>
          </div>
        )}
      </div>

      {/* add and remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToCart}>
          Add to Cart
        </button>
        <button className="button" onClick={removeItemFromCart}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
};
