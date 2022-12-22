import React from "react";
import { Header } from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import useGetServerSideProps from "../hooks/useGetServerSideProps";

export const Success = ({ categories, products }) => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-screen">
      <Header categories={categories} products={products} />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you for your order, it has now been confirmed!
            </h1>
          </div>
          <p>
            Thank you for your purchase. We will send a confirmation once your
            item has been shipped. If you would like to check the status of your
            order(s) please press the link below
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            My Orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;

export async function getServerSideProps(context) {
  return useGetServerSideProps(context);
}
