import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Order/Dashboard";

const rootStyle = {
  backgroundColor: "#ADD8E6",
  minHeight: "100vh", // Ensure the background color covers the entire viewport height
};

function App() {
  return (
    <div className="App" style={rootStyle}>
      <Routes>
        <Route path="/dashboard/:OrderId" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
