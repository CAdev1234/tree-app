import React from 'react';
import './style.css';

enum InputColorEnum {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

interface InputProps {
  m_color?: InputColorEnum;
  m_default_value?: string | number;
  m_disabled?: boolean
}

const Input:React.FC<InputProps> = ({
  m_color = InputColorEnum.Default,
  m_default_value,
  m_disabled = false
}) => {
  return (
    <>
      <input
        className={`input ${m_color}`}
        defaultValue={m_default_value}
        disabled={m_disabled}
      />
    </>
  )
}

export default Input;