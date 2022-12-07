import LineChart from "./Components/LineChart";
import Leafletmap from "./Components/Leafletmap";
import "./App.css";
import { useState } from "react";
function App() {
  return (
    <div className="App">
      <LineChart />
      <Leafletmap />
    </div>
  );
}

export default App;
