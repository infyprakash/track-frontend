import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Order/Dashboard";
import MobileUpdate from "./Pages/Order/MobileUpdate";
import Admin from "./Pages/Admin";

const rootStyle = {
  backgroundColor: "#ADD8E6",
  minHeight: "100vh", // Ensure the background color covers the entire viewport height
};

function App() {
  return (
    <div className="App" style={rootStyle}>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard/:OrderId" element={<Dashboard />} />
        <Route path="/stage/update/:OrderId" element={<MobileUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
