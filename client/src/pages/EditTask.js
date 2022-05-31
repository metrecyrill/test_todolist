import React, {useEffect, useState} from 'react'
import {Button, Container, Form} from "react-bootstrap"
import {useNavigate, useParams} from "react-router-dom"
import {editItem, getOne} from "../api/taskApi"
import {observer} from "mobx-react-lite"

const EditTask = observer(() => {
  const navigate = useNavigate()
  const [task, setTask] = useState({})
  const [checked, setChecked] = useState()
  const [text, setText] = useState()
  const {id} = useParams()

  useEffect(() => {
  getOne(id).then(data => {
    setTask(data)
    setChecked(data.completed)
    setText(data.text)
  })
  }, [])

  const updateTask = () => {
    editItem(id, checked, text)
      .then(() => navigate(-1))
      .catch((e) => e.response.data.message)
  }

  return (
    <Container className="w-50 mt-5">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Author's Name</Form.Label>
          <Form.Control placeholder={task.name} disabled />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author's Email</Form.Label>
          <Form.Control placeholder={task.email} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Task's text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Form.Group>

        <Form.Check
          className="mb-3"
          type="checkbox"
          id="checkbox"
          label="COMPLETED"
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="d-flex justify-content-sm-around ">
          <Button
            className="w-25"
            variant="outline-dark"
            type="submit"
            onClick={updateTask}
          >
            Submit
          </Button>

          <Button
            className="w-25"
            variant="danger"
            type="submit"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  )
})

export default EditTask