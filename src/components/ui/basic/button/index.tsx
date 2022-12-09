import React, { ReactNode } from 'react';
import './style.css';

export enum ButtonTypeEnum {
  Icon = 'icon',
  Text = 'text',
  Circle = 'circle'
}

export enum ButtonSizeEnum {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export enum ButtonColorEnum {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info'
}

interface ButtonProps {
  m_ref?: React.RefObject<HTMLButtonElement>;
  m_type?: ButtonTypeEnum;
  m_color?: ButtonColorEnum;
  m_size?: ButtonSizeEnum;
  m_data_attr_key?: string;
  onClick: () => void;
  children: ReactNode;
}

const Button:React.FC<ButtonProps> = ({
  m_ref,
  m_type = ButtonTypeEnum.Text,
  m_color = ButtonColorEnum.Default,
  m_size = ButtonSizeEnum.medium,
  m_data_attr_key,
  onClick,
  children
}) => {
  return (
    <button
      ref={m_ref}
      className={`btn ${m_type} ${m_color} ${m_size}`}
      data-node-key={m_data_attr_key}
      onClick={onClick}
    >{children}</button>
  )
}

export default Button;