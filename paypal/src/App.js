import logo from './logo.svg';
import './App.css';
import { Dashboard } from './Components/Dashboard';
import { Navbar } from './Components/navbar';
import { Sprint } from './Components/sprint';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Sprint/>
    </div>
  );
}

export default App;
