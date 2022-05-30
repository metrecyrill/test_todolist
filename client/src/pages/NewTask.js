import React, {useState} from 'react'
import {Button, Container, Form} from "react-bootstrap"
import {LIST_ROUTE} from "../utils/consts"
import {createItem} from "../api/taskApi"
import {useNavigate} from "react-router-dom"
import {observer} from "mobx-react-lite"

const NewTask = observer(() => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')

  const createTask = async () => {
    try {
      const response = await createItem(name, email, text)
      navigate(LIST_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container className="w-50 mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task's text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="outline-dark"
          type="submit"
          onClick={createTask}
        >
          Submit
        </Button>
      </Form>
    </Container>
  )
})

export default NewTask