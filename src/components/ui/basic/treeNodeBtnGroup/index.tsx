import React from 'react';
import TreeNode from '../../../../utils/treeNode';
import FormattedIcon from '../../icon/formattedIcon';
import Button, { ButtonColorEnum, ButtonSizeEnum, ButtonTypeEnum } from '../button';
import Input from '../input';
import './style.css'

interface TreeNodeBtnGroupProps {
  item: TreeNode,
  onInsert: (parentKey: string) => void,
  onRemove: () => void,
  onUpdate: () => void,
}

const TreeNodeBtnGroup:React.FC<TreeNodeBtnGroupProps> = ({
  item,
  onInsert,
  onRemove,
  onUpdate
}) => {
  return (
    <>
      <div className='tree-node-btn-group'>
        {/* <Button onClick={() => {}}>{item.value}</Button> */}
        <Input m_default_value={item.value} m_disabled={true} />
        <Button 
          m_type={ButtonTypeEnum.Circle} 
          m_size={ButtonSizeEnum.small} 
          m_color={ButtonColorEnum.Secondary}
          onClick={() => onInsert(item.key)}
        >
          <FormattedIcon name='FaPlus' />
        </Button>
        {item.parent && 
        <Button
          m_type={ButtonTypeEnum.Circle}
          m_size={ButtonSizeEnum.small}
          m_color={ButtonColorEnum.Secondary}
          onClick={onUpdate}
        >
          <FormattedIcon name='FaPen' />
        </Button>}
        {item.parent && 
        <Button
          m_type={ButtonTypeEnum.Circle}
          m_size={ButtonSizeEnum.small}
          m_color={ButtonColorEnum.Error}
          onClick={onRemove}
        >
          <FormattedIcon />
        </Button>}
      </div>
    </>
  )
}

export default TreeNodeBtnGroup