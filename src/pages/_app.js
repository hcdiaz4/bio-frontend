// pages/_app.js

import Header from '@/app/components/Header';
import '../app/styles/main.scss';

function MyApp({ Component, pageProps }) {

  const changeDarkMode = () => {
    const element = document.querySelector('body');
    element.classList.toggle('darkMode');
  }

  return (
    <>
      <Header darkModeEvent={changeDarkMode} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;