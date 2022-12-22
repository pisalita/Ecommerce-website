import React from "react";
import { Product } from "./Product";
import { useRouter } from "next/router";

export const Feed = ({ products }) => {
  const {
    query: { queryString },
  } = useRouter();

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.map(
        ({ id, title, price, description, category, image, rating }) => {
          if (!queryString)
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                rating={rating}
              />
            );

          if (queryString)
            if (
              category
                .replaceAll(/[^a-zA-Z]/g, "")
                .toLowerCase()
                .includes(queryString.toLowerCase()) ||
              title
                .replaceAll(/[^a-zA-Z]/g, "")
                .toLowerCase()
                .includes(queryString.toLowerCase())
            )
              return (
                <Product
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  rating={rating}
                />
              );
        }
      )}
    </div>
  );
}
