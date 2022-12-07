import React from 'react';
import './style.css';

interface BadgeProps {
  num: number
}

const Badge:React.FC<BadgeProps> = ({num}) => {
  return (
    <div className='badge'>{num}</div>
  )
}

export default Badge;