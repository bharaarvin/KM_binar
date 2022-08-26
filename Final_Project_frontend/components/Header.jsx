import Head from "next/head";
export default function Header({
  pageTitle,
  description = "SecondHand adalah sebuah platform jual beli barang bekas terbaik",
  keyword = "SecondHand, Platform, Ecommerce, Jual Beli, Barang Bekas",
}) {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link rel="manifest" href="/manifest.json" />
      <title>{pageTitle} - SecondHand</title>
    </Head>
  );
}
