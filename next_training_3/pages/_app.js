import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} foo={1} />
    </>
  );
}

export default MyApp;
