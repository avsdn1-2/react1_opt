import logo from './logo.svg';
import './App.css';
import data from './news.js';
import Block from './block';

function App() {
  return (
    <div className="App">
      {/* для каждого элемента массива выводим блок */}
      {
          data.map((el,key) => <Block item={el}/>)
        }
    </div>
  );
}

export default App;
