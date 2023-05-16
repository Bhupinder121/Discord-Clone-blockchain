import { useState } from "react";
import "./App.css";
import { Dm, MainWindow } from "./Components";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <h2>copy app </h2>
        </div>
        
      </div>
      <div className="left">
        <h3>Direct Messages</h3>
        <Dm text = "hrllo testing one two three"/>
        <Dm text = "hrllo testing one two three"/>
        <Dm text = "hrllo testing one two three"/>
        <Dm text = "hrllo testing one two three"/>
      </div>
      <MainWindow></MainWindow>
    </>
  );
}

export default App;
