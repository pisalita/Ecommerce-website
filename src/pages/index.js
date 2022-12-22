import Head from "next/head";
import { Banner } from "../components/Banner";
import { Feed } from "../components/Feed";
import { Header } from "../components/Header";
import useGetServerSideProps from "../hooks/useGetServerSideProps";

export default function Home({ products, categories }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Ecommerce website</title>
      </Head>

      <Header categories={categories} products={products} />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <Feed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  return useGetServerSideProps(context);
}
