import './App.css';
import Navigation from './components/navigation/Navigation.jsx';
import Adress_routes from './Adress_routes.jsx';
import { useState } from 'react';

const App = () =>
{
  const [error, set_error] = useState("");
  return (
    <div>

      <Navigation />
      <Adress_routes error={error} set_error={set_error} />
    </div>
  )
}

export default App;
