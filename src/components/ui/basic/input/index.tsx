import React from 'react';
import './style.css';

export enum InputColorEnum {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Secondary_1 = 'secondary_1',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

interface InputProps {
  m_color?: InputColorEnum;
  m_default_value?: string | number;
  m_disabled?: boolean,
  m_placeholder?: string,
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const Input:React.FC<InputProps> = ({
  m_color = InputColorEnum.Default,
  m_default_value,
  m_disabled = false,
  m_placeholder,
  onChange
}) => {
  return (
    <>
      <input
        className={`input ${m_color}`}
        defaultValue={m_default_value}
        disabled={m_disabled}
        placeholder={m_placeholder}
        onChange={onChange}
      />
    </>
  )
}

export default Input;