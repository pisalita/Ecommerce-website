import { getSession } from "next-auth/react";

const useGetServerSideProps = async (context) => {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  // get categories and remove duplicates
  const categories = [];
  products.filter((product) => {
    if (!categories.includes(product.category))
      categories.push(product.category);
  });

  return {
    props: {
      products,
      categories,
      session,
    },
  };
};

export default useGetServerSideProps;
