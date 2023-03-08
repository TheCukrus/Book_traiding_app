import './App.css';
import Navigation from './components/navigation/Navigation.jsx';
import Adress_routes from './Adress_routes.jsx';
import { useState } from 'react';

const App = () =>
{
  const [error, set_error] = useState(false);
  const [success_message, set_success_message] = useState(false);
  return (
    <div>

      <Navigation />

      <Adress_routes
        error={error}
        set_error={set_error}
        success_message={success_message}
        set_success_message={set_success_message}
      />

    </div>
  )
}

export default App;
