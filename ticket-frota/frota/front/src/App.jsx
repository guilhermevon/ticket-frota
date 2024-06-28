import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Container from "./layout/container";
import Footer from "./components/Footer";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Container />
      <Footer />
    </>
  );
}

export default App;
