import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { CheckoutProduct } from "../components/CheckoutProduct";
import { Header } from "../components/Header";
import { selectItems, selectTotal } from "../slices/cartSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import useGetServerSideProps from "../hooks/useGetServerSideProps";
const stripePromise = loadStripe(process.env.stripe_public_key);

export const Checkout = ({ categories, products }) => {
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // create checkout session on the backend
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    // redirect to Checkout from Stripe
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header categories={categories} products={products} />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left Section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={"/assets/images/checkoutImage.jpg"}
            width={1020}
            height={250}
            objectFit="cover"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4 font-semibold">
              {items.length === 0 ? "Your cart is empty" : "Shopping Cart"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={Math.round(item.rating)}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasNextDayDelivery={item.hasNextDayDelivery}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold ml-2">
                  <Currency quantity={totalPrice} />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  return useGetServerSideProps(context);
}
