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
  m_type?: ButtonTypeEnum;
  m_color?: ButtonColorEnum;
  m_size?: ButtonSizeEnum;
  onClick: () => void;
  children: ReactNode;
}

const Button:React.FC<ButtonProps> = ({
  m_type = ButtonTypeEnum.Text,
  m_color = ButtonColorEnum.Default,
  m_size = ButtonSizeEnum.medium,
  onClick,
  children
}) => {
  return (
    <button
      className={`btn ${m_type} ${m_color} ${m_size}`}
      onClick={onClick}
    >{children}</button>
  )
}

export default Button;