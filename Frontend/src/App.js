import Header from './components/header/Header.jsx';
import Adress_routes from './Adress_routes.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/navbar/Navbar.jsx';
import s from "./App.module.css";

const App = () =>
{
  const [user, set_user] = useState({}); //User informacion
  const [error, set_error] = useState(false); //Error messages
  const [success_message, set_success_message] = useState(false); //Success messages
  const [is_authenticated, set_is_authenticated] = useState(false); //Authentication
  const [all_books, set_all_books] = useState([]) // All books from database
  const [books_id, set_books_id] = useState(null); //Books ID

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

  //Get all books from database
  const fetch_all_books = async () =>
  {
    try
    {
      const response = await axios.get("http://127.0.0.1:80/api/v1/book/")
      console.log(response.data.books);
      set_all_books(response.data.books);
    }
    catch (err)
    {
      console.log(err);
    }
  }

  useEffect(() => { fetch_user_data() }, [])
  useEffect(() => { fetch_all_books() }, [])

  return (
    <div className={s.container}>

      <div className={s.header}>
        <Header
          user={user}
          set_user={set_user}
          is_authenticated={is_authenticated}
          set_is_authenticated={set_is_authenticated}
        />
      </div>

      <div className={s.navbar}>
        <Navbar
        user={user}
        />
      </div>

      <div className={s.routes}>
        <Adress_routes
          error={error}
          set_error={set_error}
          success_message={success_message}
          set_success_message={set_success_message}
          user={user}
          fetch_all_books={fetch_all_books}
          all_books={all_books}
          set_all_books={set_all_books}
          set_books_id={set_books_id}
        />
      </div>

    </div>
  )
}

export default App;