import React, {useContext} from 'react'
import {Button, Card, Container, Form} from "react-bootstrap"
import {auth} from "../api/userApi"
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {useNavigate} from "react-router-dom"
import {LIST_ROUTE} from "../utils/consts"
import {Formik} from "formik"
import * as yup from 'yup'


const Auth = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const schema = yup.object().shape({
    login: yup.string().required('Enter login'),
    password: yup.string().required('Enter password')
  })

  const signIn = (data) => {
    const {login, password} = data
    return auth(login, password)
  };

  const submit = (data, actions) => {
    signIn(data)
      .then((response) => {
        user.setData(response)
        user.setIsAuth(true)
        navigate(LIST_ROUTE)
      })
      .catch(error => {
        actions.setFieldError("password", error.response.data.message)
      })
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="p-5 w-50">
        <h2 className="m-auto">Authorization</h2>
        <Formik
          onSubmit={submit}
          validationSchema={schema}
          initialValues={{
            login: '',
            password: ''
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
              <Form className="d-flex flex-column" noValidate onSubmit={handleSubmit}>
                <Form.Control
                  className="mt-3"
                  placeholder="Enter login"
                  type="text"
                  name="login"
                  value={values.login}
                  onChange={handleChange}
                  isInvalid={!!errors.login}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.login}
                </Form.Control.Feedback>
                <Form.Control
                  className="mt-3"
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <Button
                  variant="outline-dark"
                  className="mt-3"
                  type="submit"
                >
                  Log in
                </Button>
              </Form>
            )}
        </Formik>
      </Card>
    </Container>
  )
})

export default Auth