import React from 'react'

interface ActionButtonProps {
  action: () => void
  icon: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, action }) => {
  return (
    <button
      className='button is-primary is-small'
      onClick={action}
    >
      <span className='icon'>
        <i className={icon}></i>
      </span>
    </button>
  )
}

export default ActionButton