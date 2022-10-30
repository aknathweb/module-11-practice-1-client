import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(name, email);

    // post:
    fetch('http://localhost:5000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      // .then(data => console.log(data))
      .then(data => {
        const NewUsers = [...users, data];
        setUsers(NewUsers);
      })
      .catch(error => console.error(error))
  }


  return (
    <div className="App">
      <h1>This is App page {users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" id="" />
      </form>
      {
        users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
      }
    </div>
  );
}

export default App;
