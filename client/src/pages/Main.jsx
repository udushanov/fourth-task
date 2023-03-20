import axios from "axios";
import { useState, useEffect } from "react";

export function Main() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/main");
        console.log(res.data)
        setUsers(res.data)
      } catch (err) {
        console.log(err);
      }
    }

    getUsers()
  }, [])

  return <h1></h1>;
}
