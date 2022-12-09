import React, {useState, useRef, useEffect} from 'react';
import FormattedIcon from '../../icon/formattedIcon';
import Button, { ButtonColorEnum, ButtonSizeEnum, ButtonTypeEnum } from '../button';
import Input, { InputColorEnum } from '../input';
import './style.css'

import { RawNodeDatum } from 'react-d3-tree/lib/types/common';

export enum TreeNodeTypeEnum {
  Service = 'service',
  Category = 'category'
}
interface TreeNodeBtnGroupProps {
  item: RawNodeDatum;
  onInsert: (parentKey: string, name: string, domRect?: DOMRect) => void;
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
  const [name, setName] = useState<string>('');
  const insert = (key: string) => {
    onInsert(key, name)
  }
  const update = () => {
    if (item.attributes) onUpdate(name, String(item.attributes.key));
  }
  const setEditable = () => {
    if (item.attributes) onSetEditable(String(item.attributes.key));
  }
  // useEffect(() => {
  //   console.log(name)
  // }, [name])
  return (
    <>
      <div className='tree-node-btn-group'>
        {item.attributes && item.attributes.parentKey === '' &&
          <>
            <Input
              m_default_value={item.name}
              m_disabled={true}
              m_placeholder={`${item.attributes.type} name`}
            />
            <Button 
              m_type={ButtonTypeEnum.Circle} 
              m_size={ButtonSizeEnum.small} 
              m_color={ButtonColorEnum.Secondary}
              m_data_attr_key={String(item.attributes.key)}
              onClick={() => insert(String(item.attributes?.key))}
            >
              <FormattedIcon name='FaPlus' />
            </Button>
          </>
        }
        
        
        {item.attributes && item.attributes.parentKey !== '' && 
          <>
            <Input
              m_disabled={!item.attributes.isEdit}
              m_color={item.attributes.isEdit ? InputColorEnum.Default : item.attributes.depth > 1 ? InputColorEnum.Secondary_1 : InputColorEnum.Warning}
              m_placeholder={`${item.attributes.type} name`}
              onChange={(evt) => {
                setName(evt.currentTarget.value)
              }}
              m_default_value={String(item.attributes.key)}
            />
            {!item.attributes.isEdit &&
            <>
              <Button
                m_ref={addBtnRef}
                m_type={ButtonTypeEnum.Circle} 
                m_size={ButtonSizeEnum.small} 
                m_color={ButtonColorEnum.Secondary}
                m_data_attr_key={String(item.attributes.key)}
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