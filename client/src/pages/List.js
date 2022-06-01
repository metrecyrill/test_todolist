import React, {useContext, useEffect, useState} from 'react'
import {Container, Table} from "react-bootstrap"
import {Context} from "../index"
import {Link} from "react-router-dom"
import {TASK_ROUTE} from "../utils/consts"
import {observer} from "mobx-react-lite"
import {getItems} from "../api/taskApi"
import Pages from "../components/Pages"

const List = observer(() => {
  const {tasks, user} = useContext(Context)
  const [sort, setSort] = useState('name')
  const [order, setOrder] = useState('asc')

  const useSort = (sortName) => {
    if (sortName === sort) {
      setOrder((order === 'asc') ? 'desc' : 'asc')
    } else {
      setOrder('asc')
      setSort(sortName)
    }
  }

  useEffect(() => {
    getItems(tasks.page, tasks.limit, sort, order).then(data => {
      tasks.setItems(data.rows)
      tasks.setTotalCount(data.count)
    })
  }, [tasks.page, sort, order])

  return (
    <Container className="d-flex flex-column mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="col-1" onClick={() => useSort('name')}>Name</th>
            <th className="col-2" onClick={() => useSort('email')}>Email</th>
            <th className="col-6">Task text</th>
            <th className="col-1" onClick={() => useSort('completed')}>Status</th>
            <th className="col-1">Edited</th>
            {
              user.isAuth ? <th></th> : ''
            }
          </tr>
        </thead>
        <tbody>
          {
            tasks.items.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.email}</td>
                  <td>{task.text}</td>
                  <td>{task.completed ? "COMPLETED" : "PROCESSING"}</td>
                  <td>{task.editedBy ? "edited": ""}</td>
                  {
                    user.isAuth ? <td><Link to={TASK_ROUTE + "/" + task.id}>edit</Link></td> : ''
                  }
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <Pages />
    </Container>
  )
})

export default List