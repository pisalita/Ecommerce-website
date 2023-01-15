import { buffer } from "micro";
import * as admin from "firebase-admin";

// Connect to firebase on the backend
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const addOrderToDB = async (session) => {
  console.log("writing to db", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // make sure the event posted is comming from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // handle checkout.session.completed event
    if (event.type == "checkout.session.completed") {
      const session = event.data.object;

      // add the order to our own database
      return addOrderToDB(session)
        .then(() => res.status(200).send({ message: "success!" }))
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
    }
  }
  res.send({ message: "Not a post request!" });
};

export const config = {
  api: {
    // we dont want the bodyParser as were consuming a stream
    bodyParser: false,
    // we need this to react to external event trigger (webhook)
    externalResolver: true,
  },
};
