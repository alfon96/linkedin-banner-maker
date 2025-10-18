import "./App.css";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import SvgPreview from "./components/svgBanner/svgBanner";
import Toolbar from "./components/toolbar/Toolbar";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Navbar />
        <SvgPreview />
        <hr />
        <Toolbar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
