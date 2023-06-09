
import './App.css';
import DeletePage from './components/delete';
import RestaurantList from './components/home';
import LoginForm from './components/createresturant';



function App() {
  return (
    <div className="App">

      <LoginForm/>
      <RestaurantList/> 
      <DeletePage/>
    </div>
  );
}

export default App;
