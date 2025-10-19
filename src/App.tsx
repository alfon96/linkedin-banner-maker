import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import SvgPreview from "./components/SvgBanner/svgBanner";
import Toolbar from "./components/Toolbar/Toolbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <p className="description">
        Instantly generate a clean LinkedIn banner with your name, role, and
        tech stack, ideal for developer profiles.
      </p>
      <div className="layout">
        <Toolbar />
        <SvgPreview />
      </div>
      <Footer />
    </div>
  );
}

export default App;
