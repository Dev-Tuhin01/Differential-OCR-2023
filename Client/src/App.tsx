import "./App.css";
import ImageLoader from "./components/ImageLoader";
import SystaxList from "./components/SyntaxList";

function App() {
  return (
    <div className="app">
      <header>Differential OCR</header>
      <ImageLoader />
      <SystaxList />
    </div>
  );
}

export default App;
