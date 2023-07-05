import "./App.css";
import NavBar from "./Component/Navbar";
import Routers from "./Component/Router";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <Routers />
    </div>
  );
}

export default App;
