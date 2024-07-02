import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
// import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routing />
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};

export default App;
