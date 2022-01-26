import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return(
    <div className="App" >
      <Head>
      <link
      href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
      </Head>
      <Component {...pageProps} />
    </div>
    
  )
}

export default MyApp
