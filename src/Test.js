import React from 'react'
import useModal from './hooks/useModal'

function ModalHelloWorld(props) {
  return <h1>Hello World, my name is {props.name}</h1>
}

function Test() {
  const modal = useModal()

  function handleOpenModal() {
    modal.open({
      Component: ModalHelloWorld,
      props: {
        name: 'Polidoro'
      },
    })
  }

  return (
    <button type="button" onClick={handleOpenModal}>Open modal</button>
  )
}

export default Test
