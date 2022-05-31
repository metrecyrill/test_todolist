import React from 'react'
import {Button, Container, Form} from "react-bootstrap"
import {LIST_ROUTE} from "../utils/consts"
import {createItem} from "../api/taskApi"
import {useNavigate} from "react-router-dom"
import {observer} from "mobx-react-lite"
import {Formik} from "formik"
import * as yup from 'yup'

const NewTask = observer(() => {
  const navigate = useNavigate()
  const schema = yup.object().shape({
    name: yup.string().required('Enter your name'),
    email: yup.string().required('Enter your email').email('Incorrect email'),
    text: yup.string().required('Enter task text')
  })

  const createTask = (data) => {
    const {name, email, text} = data
    return createItem(name, email, text)
  }

  const submit = (data, actions) => {
    createTask(data)
      .then(() => navigate(LIST_ROUTE))
      .catch(error => actions.setFieldError("text", error.response.data.message))
  }

  return (
    <Container className="w-50 mt-5">
      <Formik
        onSubmit={submit}
        validationSchema={schema}
        initialValues={{
          name: '',
          email: '',
          text: ''
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Task's text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                value={values.text}
                onChange={handleChange}
                isInvalid={!!errors.text}
              />
              <Form.Control.Feedback type="invalid">
                {errors.text}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="outline-dark"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
})

export default NewTask