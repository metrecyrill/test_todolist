import React, {useContext, useState} from 'react'
import {Button, Card, Container, Form} from "react-bootstrap"
import {auth} from "../api/userApi"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {useNavigate} from "react-router-dom"
import {LIST_ROUTE} from "../utils/consts"


const Auth = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    try {
      const response = await auth(login, password)
      user.setData(response)
      user.setIsAuth(true)
      navigate(LIST_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="p-5 w-50">
        <h2 className="m-auto">Authorization</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter login"
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="outline-dark"
            className="mt-3"
            onClick={signIn}
          >
            Log in
          </Button>
        </Form>
      </Card>
    </Container>
  )
})

export default Auth