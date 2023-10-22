import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Staking from "./pages/Staking";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Staking />} />
      </Routes>
    </div>
  );
}

export default App;
