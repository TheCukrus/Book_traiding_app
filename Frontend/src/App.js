import './App.css';
import Navigation from './components/navigation/Navigation.jsx';
import Adress_routes from './Adress_routes.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () =>
{
  const [user, set_user] = useState({});
  const [error, set_error] = useState(false);
  const [success_message, set_success_message] = useState(false);
  const [is_authenticated, set_is_authenticated] = useState(false);

  const fetch_user_data = async () =>
  {
    try
    {
      //Get token from headers
      const token = document.cookie.replace("token=", "");

      const response = await axios.get("http://127.0.0.1:80/api/v1/user/",
        {
          headers: { Authorization: `Bearer ${token}` }
        })

      if (response.status !== 200)
      {
        set_is_authenticated(false);
        return;
      }
      set_is_authenticated(true);
      set_user(response.data)
      console.log(response.data)
    }
    catch (err)
    {
      console.log("Login fail")
    }
  }

  useEffect(() => { fetch_user_data() }, [])

  return (
    <div>

      <Navigation
        user={user}
        set_user={set_user}
        is_authenticated={is_authenticated}
        set_is_authenticated={set_is_authenticated}
      />

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