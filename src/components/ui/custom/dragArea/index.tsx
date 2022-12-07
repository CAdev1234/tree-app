import React, { useRef, useState } from 'react';
import { genUUID } from '../../../../utils/genUUID';
import { Tree } from '../../../../utils/treeNode';
import Button, { ButtonColorEnum, ButtonTypeEnum } from '../../basic/button';
import TreeNodeBtnGroup from '../../basic/treeNodeBtnGroup';
import FormattedIcon from '../../icon/formattedIcon';
import { Draggable } from '../draggable';
import './style.css';

const DragArea = () => {
  const dragAreaRef = useRef<HTMLDivElement>(null)
  const tree = new Tree(genUUID(), 'Categories');
  console.log('tree=', tree)

  const insertNode = (parentKey: string) => {
    // tree.insert(parentKey, genUUID(), "Category")
    console.log(parentKey)
  }
  const updateNode = () => {

  }
  const removeNode = () => {

  }

  return (
    <div className='drag-area' ref={dragAreaRef}>
      <div className='up'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaChevronUp' />
        </Button>
      </div>
      <div className='right'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaChevronRight' />
        </Button>
      </div>
      <div className='bottom'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaChevronDown' />
        </Button>
      </div>
      <div className='left'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {console.log("33333333333333")}}
        >
          <FormattedIcon name='FaChevronLeft' />
        </Button>
      </div>

      <div>
        <Draggable dragAreaRef={dragAreaRef}>
          <TreeNodeBtnGroup
            item={tree.root}
            onInsert={insertNode}
            onUpdate={() => updateNode()}
            onRemove={() => removeNode()}
          />
        </Draggable>
        <Draggable dragAreaRef={dragAreaRef}>
          <div style={{width: '50px', height: '50px', backgroundColor: 'yellow'}}></div>
        </Draggable>  
      </div>
    </div>
  )
}

export default DragArea;