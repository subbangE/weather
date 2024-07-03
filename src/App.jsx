import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { useAuthContext } from "./hooks/useAuthContext";
// import Footer from "./components/Footer/Footer";

const App = () => {
  const { authIsReady, user } = useAuthContext(); // 파이어베이스 인증상태 확인

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <div className="app">
            <Navbar user={user} />
            <main>
              <Routing user={user} />
            </main>
            {/* <footer>
              <Footer />
            </footer> */}
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
