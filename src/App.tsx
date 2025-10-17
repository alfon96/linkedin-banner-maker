import "./App.css";
import Banner from "./components/banner/Banner";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Toolbar from "./components/toolbar/Toolbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Banner />
      <Toolbar />
      <Footer />
    </div>
  );
}

export default App;
