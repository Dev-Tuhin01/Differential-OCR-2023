import "./App.css";
import ImageLoader from "./components/ImageLoader";
import SystaxList from "./components/SyntaxList";

function App() {
  return (
    <div className="app">
      {/*Heading for the document*/}
      <header>Differential OCR</header>
      {/*The Image loader component. This section is responisble for taking the user input*/}
      <ImageLoader />
      {/*The Syntax List. After OCR the tokens will be displayed here*/}
      <SystaxList />
    </div>
  );
}

export default App;
