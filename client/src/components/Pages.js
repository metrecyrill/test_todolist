import React, {useContext} from 'react'
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {Pagination} from "react-bootstrap"

const Pages = observer(() => {
  const {tasks} = useContext(Context)
  console.log(tasks.totalCount)
  const pageCount = Math.ceil(tasks.totalCount / tasks.limit)
  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination className="mt-2 m-auto">
      {pages.map(page =>
        <Pagination.Item
          key={page}
          active={tasks.page === page}
          onClick={() => tasks.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  )
})

export default Pages