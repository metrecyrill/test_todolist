import {BrowserRouter} from "react-router-dom"
import React, {useContext, useEffect, useState} from "react"
import AppRouter from "./components/AppRouter"
import Navbar from "./components/NavBar"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./api/userApi";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      check().then(data => {
        user.setIsAuth(true)
        user.setData(data)
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Spinner animation="grow" />
  }

  return (
    <BrowserRouter>
        <Navbar />
        <AppRouter />
    </BrowserRouter>
  )
})

export default App
