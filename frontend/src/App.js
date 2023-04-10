import { useEffect } from 'react';
import './App.css';
import Header from './components/Home/Header';
import Home from './components/Home/Home';
import WebFont from 'webfontloader';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })
  })
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
