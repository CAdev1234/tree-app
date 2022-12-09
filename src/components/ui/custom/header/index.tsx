import React from 'react';
import Badge from '../../basic/badge';
import Button, { ButtonTypeEnum, ButtonColorEnum } from '../../basic/button';
import FormattedIcon from '../../icon/formattedIcon';
import './style.css'

const Header = () => {
  return (
    <header className='header'>
      <span className='logo'>
        <h1>Services</h1>
        <Badge num={0} />
      </span>
      <span className='btn-group'>
        <Button
          m_color={ButtonColorEnum.Primary}
          onClick={() => {}}
        >LIST VIEW</Button>
        <Button
          m_type={ButtonTypeEnum.Icon}
          onClick={() => {}}
        >
          <FormattedIcon name='FaPaperPlane' />
        </Button>
        <Button
          m_type={ButtonTypeEnum.Icon}
          onClick={() => {}}
        >
          <FormattedIcon name='FaMinus' />
        </Button>
        <Button
          m_type={ButtonTypeEnum.Icon}
          onClick={() => {}}
        >
          <FormattedIcon name='FaPlus' />
        </Button>
      </span>
    </header>
  )
}

export default Header;