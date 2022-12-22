import React from "react";
import { Header } from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import db from "../../firebase";
import moment from "moment";
import Order from "../components/Order";
import useGetServerSideProps from "../hooks/useGetServerSideProps";

const Orders = ({ orders, categories, products }) => {
  const { data: session } = useSession();

  return (
    <div>
      <Header categories={categories} products={products} />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // get users orders from firebase db
  const stripeOrdersFromFirebase = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // get more data for the orders from stripe
  const orders = await Promise.all(
    stripeOrdersFromFirebase.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      //unix for timestamp
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  const {
    props: { categories, products },
  } = await useGetServerSideProps(context);

  // return the orders and categories
  return {
    props: {
      orders,
      categories,
      products,
    },
  };
}
