import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useModal from '../hooks/useModal'

function ModalFactory() {
  const body = document.body
  const DEFAULT_WIDTH = {
    width: '80%',
    minWidth: 240,
    maxWidth: 768,
  }

  const [state, setState] = useState({
    isActive: false,
    Component: () => <div>Teste</div>,
    props: {},
    width: DEFAULT_WIDTH
  })
  const modal = useModal()

  function handleModalToggle(payload) {
    if (payload.status) {
      setState({
        ...state,
        Component: payload.Component,
        props: payload.props,
        width: payload.width ?? DEFAULT_WIDTH,
        isActive: payload.status
      })
    } else {
      setState({
        ...state,
        Component: () => <div></div>,
        props: {},
        width: DEFAULT_WIDTH,
        isActive: payload.status
      })
    }
  }
  
  useEffect(() => {
    modal.listen(handleModalToggle)

    return () => {
      modal.off(handleModalToggle)
    }
  }, [])

  return createPortal(
    state.isActive && 
    <div
      id="modal"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: '50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.20)'
      }}
      onClick={() => handleModalToggle({ status: false })}
    >
      {console.log('STATE', <state.Component />)}
      <div
        style={{
          position: 'fixed',
          margin: '0 40px 0 40px',
          width: state.width.width,
          maxWidth: state.width.maxWidth ?? state.width.width,
          minWidth: state.width.minWidth ?? state.width.width,
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#FFF',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 48px 40px 48px',
            backgroundColor: '#FFF'
            }}
          >
            <state.Component { ...state.props } />
          </div>
        </div>
      </div>
    </div>
    , body
  )
}

export default ModalFactory
