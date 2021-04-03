import React from 'react'
import useModal from './hooks/useModal'

function ModalHelloWorld(props) {
  return <h1>Hello World, my name is {props.name}</h1>
}

function ModalClose(props) {
  return <h1>Please {props.name}, close this modal!</h1>
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

  function handleCloseModal() {
    modal.open({
      Component: ModalClose,
      props: {
        name: 'Joao Vitor'
      },
    })
  }

  return (
    <>
      <button type="button" onClick={handleOpenModal}>Open modal</button>
      <br/>
      <button type="button" onClick={handleCloseModal}>Close</button>
    </>
  )
}

export default Test
