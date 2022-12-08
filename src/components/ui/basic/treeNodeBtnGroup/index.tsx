import React, {useState, useRef} from 'react';
import FormattedIcon from '../../icon/formattedIcon';
import Button, { ButtonColorEnum, ButtonSizeEnum, ButtonTypeEnum } from '../button';
import Input, { InputColorEnum } from '../input';
import './style.css'

import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

interface TreeNodeBtnGroupProps {
  item: RawNodeDatum;
  onInsert: (parentKey: string, domRect?: DOMRect) => void;
  onRemove: (key: string) => void;
  onUpdate: (name: string, key: string) => void;
  onSetEditable: (key: string) =>  void;
}

const TreeNodeBtnGroup:React.FC<TreeNodeBtnGroupProps> = ({
  item,
  onInsert,
  onRemove,
  onUpdate,
  onSetEditable,
}) => {
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState(item.name);
  const insert = (key: string) => {
    if (addBtnRef.current) {
      console.log(addBtnRef.current.getBoundingClientRect())
      onInsert(key, addBtnRef.current.getBoundingClientRect());
    }else onInsert(key);
  }
  const update = () => {
    if (item.attributes) onUpdate(name, String(item.attributes.key));
  }
  const setEditable = () => {
    if (item.attributes) onSetEditable(String(item.attributes.key));
  }
  return (
    <>
      <div className='tree-node-btn-group'>
        {item.attributes && item.attributes.parentKey === '' &&
          <>
            <Input
              m_default_value={item.name}
              m_disabled={true}
            />
            <Button 
              m_type={ButtonTypeEnum.Circle} 
              m_size={ButtonSizeEnum.small} 
              m_color={ButtonColorEnum.Secondary}
              onClick={() => insert(String(item.attributes?.key))}
            >
              <FormattedIcon name='FaPlus' />
            </Button>
          </>
        }
        
        
        {item.attributes && item.attributes.parentKey !== '' && 
          <>
            <Input
              m_default_value={item.name}
              m_disabled={!item.attributes.isEdit}
              m_color={item.attributes.isEdit ? InputColorEnum.Default : item.attributes.depth > 1 ? InputColorEnum.Secondary_1 : InputColorEnum.Warning}
              onChange={(evt) => {
                setName(evt.currentTarget.value)
              }}
            />
            {!item.attributes.isEdit &&
            <>
              <Button
                m_ref={addBtnRef}
                m_type={ButtonTypeEnum.Circle} 
                m_size={ButtonSizeEnum.small} 
                m_color={ButtonColorEnum.Secondary}
                onClick={() => insert(String(item.attributes?.key))}
              >
                <FormattedIcon name='FaPlus' />
              </Button>
              <Button
                m_type={ButtonTypeEnum.Circle}
                m_size={ButtonSizeEnum.small}
                m_color={ButtonColorEnum.Secondary}
                onClick={setEditable}
              >
                <FormattedIcon name='FaPen' />
              </Button>
              <Button
                m_type={ButtonTypeEnum.Circle}
                m_size={ButtonSizeEnum.small}
                m_color={ButtonColorEnum.Error}
                onClick={() => onRemove(String(item.attributes?.key))}
              >
                <FormattedIcon name='FaTimes' />
              </Button>
            </>
            }
            {item.attributes.isEdit &&
            <>
              <Button
                m_type={ButtonTypeEnum.Circle}
                m_size={ButtonSizeEnum.small}
                m_color={ButtonColorEnum.Info}
                onClick={() => onRemove(String(item.attributes?.key))}
              >
                <FormattedIcon name='FaTimes' />
              </Button>
              <Button
                m_type={ButtonTypeEnum.Circle}
                m_size={ButtonSizeEnum.small}
                m_color={ButtonColorEnum.Success}
                onClick={update}
              >
                <FormattedIcon />
              </Button>
            </>
            }
            
          </>
        }
      </div>
    </>
  )
}

export default TreeNodeBtnGroup