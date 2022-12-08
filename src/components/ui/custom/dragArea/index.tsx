import React, { useRef, useState, useEffect } from 'react';
import { genUUID } from '../../../../utils/genUUID';
import Button, { ButtonColorEnum, ButtonTypeEnum } from '../../basic/button';
import TreeNodeBtnGroup from '../../basic/treeNodeBtnGroup';
import FormattedIcon from '../../icon/formattedIcon';
import { Draggable } from '../draggable';
import './style.css';
import Tree from 'react-d3-tree';
import { Tree1, TreeActionEnum } from '../../../../utils/treeNode1';
import { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree/lib/types/common';


const DragArea = () => {
  const dragAreaRef = useRef<HTMLDivElement>(null)
  const tree = new Tree1(
    {
      name: 'Category 1',
      attributes: {
        parentKey: '',
        key: genUUID(),
        isEdit: true,
        depth: 0
      },
      children: [],
      __rd3t: {
        collapsed: true,
        depth: 0,
        id: genUUID()
      }
    }
  )
  const [treeData, setTreeData] = useState<TreeNodeDatum>(tree.root)
  const [modalPos, setModalPos] = useState({posX: 0, posY: 0})
  const [showModal, setShowModal] = useState<boolean>(false)
  
  const renderTreeNodeBtnGroup = (item: CustomNodeElementProps) => {
    return (
        <foreignObject width='100vw' height={700}>
          <TreeNodeBtnGroup
            item={item.nodeDatum}
            onInsert={(pKey, domRect) => updateTree(pKey, TreeActionEnum.Insert, JSON.stringify(domRect))}
            onUpdate={(name: string, key: string) => updateTree(key, TreeActionEnum.Update, name)}
            onRemove={(key: string) => updateTree(key, TreeActionEnum.Remove, '')}
            onSetEditable={(key) => updateTree(key, TreeActionEnum.Set_Editable, '')}
          />
        </foreignObject>
    )
  }

  const updateTree = (key: string, action: TreeActionEnum, data: TreeNodeDatum | string) => {
    const copyTreeData = JSON.parse(JSON.stringify(treeData))
    if (action === TreeActionEnum.Insert) {
      const newKey = genUUID()
      const newItem: TreeNodeDatum = {
        name: `category ${newKey}`,
        attributes: {
          parentKey: key,
          key: newKey,
          isEdit: true,
          depth: 0
        },
        children: [],
        __rd3t: {
          collapsed: true,
          depth: 0,
          id: newKey
        }
      }
      if (data) {
        setModalPos({...modalPos, posX: JSON.parse(String(data)).left, posY: JSON.parse(String(data)).top + JSON.parse(String(data)).height + 10})
        setShowModal(true)
      }
      data = newItem
    }
    const updated = tree.findByKeyWithAction(copyTreeData, key, action, data, 0)
    setTreeData(updated)
  }

  const chooseType = () => {
    setShowModal(false)
  }

  useEffect(() => {
    console.log(treeData)
  }, [treeData])

  
  useEffect(() => {
    console.log(modalPos)
  }, [modalPos])

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

      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        {/* <Draggable dragAreaRef={dragAreaRef}></Draggable> */}
        <div id="treeWrapper" style={{ width: '100%', height: `100%` }}>
          <Tree
            data={treeData}
            orientation="vertical"
            separation={{ siblings: 2, nonSiblings: 2 }}
            pathFunc="step"
            renderCustomNodeElement={renderTreeNodeBtnGroup}
          />
        </div>
      </div>

      {showModal && <div className='modal' style={{top: `${modalPos.posY}px`, left: `${modalPos.posX}px`}}>
        <h4>What do you want to create?</h4>
        <div className='option-btn-group'>
          <Button
            m_color={ButtonColorEnum.Primary}
            onClick={() => chooseType()}
          >CATEGORY</Button>
          <Button
            m_color={ButtonColorEnum.Primary}
            onClick={() => chooseType()}
          >SERVICE</Button>
        </div>
      </div>}
    </div>
  )
}

export default DragArea;