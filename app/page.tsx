
import Head from "next/head";
import HeroSection from "./component/heroSection";
import MainContent from "./component/maincontent";
import Header from "./component/header";
import Footer from "./component/footer";


export default function Home() {
  return (
    <main>
      <Header/>
      <HeroSection />
      <MainContent />
      <Footer/>
      

    </main>
  );
}