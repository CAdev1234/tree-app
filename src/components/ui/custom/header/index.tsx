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
          onClick={() => {console.log("33333333333333")}}
        >LIST VIEW</Button>
        <Button
          m_type={ButtonTypeEnum.Icon}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaPaperPlane' />
        </Button>
        <Button
          m_type={ButtonTypeEnum.Icon}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaMinus' />
        </Button>
        <Button
          m_type={ButtonTypeEnum.Icon}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaPlus' />
        </Button>
      </span>
    </header>
  )
}

export default Header;