import React, { useRef, useState, useEffect } from 'react';
import { genUUID } from '../../../../utils/genUUID';
import Button, { ButtonColorEnum, ButtonTypeEnum } from '../../basic/button';
import TreeNodeBtnGroup, { TreeNodeTypeEnum } from '../../basic/treeNodeBtnGroup';
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
        depth: 0,
        type: TreeNodeTypeEnum.Category
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
  const [activeNode, setActiveNode] = useState<TreeNodeDatum>({
    name: '',
    attributes: {
      parentKey: '',
      key: '',
      isEdit: true,
      depth: 0,
      type: TreeNodeTypeEnum.Category
    },
    children: [],
    __rd3t: {
      collapsed: true,
      depth: 0,
      id: ''
    }
  })
  const [modalPos, setModalPos] = useState({posX: 0, posY: 0})
  const [activeChooseModal, setActiveChooseModal] = useState<boolean>(false)
  
  const renderTreeNodeBtnGroup = (item: CustomNodeElementProps) => {
    return (
        <foreignObject width='100vw' height={700}>
          <TreeNodeBtnGroup
            item={item.nodeDatum}
            onInsert={(pKey) => checkShowModalOrNot(pKey)}
            onUpdate={(name: string, key: string) => handleTreeData(key, TreeActionEnum.Update, name)}
            onRemove={(key: string) => handleTreeData(key, TreeActionEnum.Remove, '')}
            onSetEditable={(key) => handleTreeData(key, TreeActionEnum.Set_Editable, '')}
          />
        </foreignObject>
    )
  }

  const handleTreeData = (key: string, action: TreeActionEnum, data: TreeNodeDatum | string) => {
    console.log("333333333333", key)
    const copyTreeData = JSON.parse(JSON.stringify(treeData))
    const updated = tree.findByKeyWithAction(copyTreeData, key, action, data, 0)
    setTreeData(updated)
  }

  const checkShowModalOrNot = async (key: string) => {
    console.log("000000000000000000000000000", key)
    const copyTreeData = JSON.parse(JSON.stringify(treeData))
    const updated =  tree.findByKeyWithAction(copyTreeData, key, TreeActionEnum.Find, '', 0)
    console.log("updated=", updated)
    if (updated && updated.children) {
      setActiveNode(updated)
      if (updated.children.length === 0) showChooseModal(key)
      else chooseType(String(updated.children[0].attributes?.type))
    }
  }

  const showChooseModal = (key: string) => {
    console.log("888888888888")
    const plusBtnPos = document.querySelector(`button[data-node-key="${key}"]`)?.getBoundingClientRect()
    if (plusBtnPos) {
      setModalPos({...modalPos, posX: plusBtnPos.left, posY: plusBtnPos.top + plusBtnPos.height + 10})
      setActiveChooseModal(true)
    }
  }

  const chooseType = (type: string) => {
    setActiveChooseModal(false)
    const newKey = genUUID()
    const newNode: TreeNodeDatum = {
        name: '',
        attributes: {
          parentKey: activeNode.attributes!.key,
          key: newKey,
          isEdit: true,
          depth: 0,
          type: type
        },
        children: [],
        __rd3t: {
          collapsed: true,
          depth: 0,
          id: newKey
        }
      }
    handleTreeData(String(activeNode.attributes!.key), TreeActionEnum.Insert, newNode)
  }

  // useEffect(() => {
  //   console.log("aaaaaaaaaaaaaa", activeNode)
  //   if (activeNode.children && activeNode.attributes) {
  //     console.log("bbbbbbbbbbbbbbb")
  //     if (activeNode.children.length === 0) showChooseModal(String(activeNode.attributes.parentKey))
  //     else chooseType(String(activeNode.children[0].attributes?.type))
  //   }
  // }, [activeNode])

  return (
    <div className='drag-area' ref={dragAreaRef}>
      <div className='up'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {}}
        >
          <FormattedIcon name='FaChevronUp' />
        </Button>
      </div>
      <div className='right'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {}}
        >
          <FormattedIcon name='FaChevronRight' />
        </Button>
      </div>
      <div className='bottom'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {}}
        >
          <FormattedIcon name='FaChevronDown' />
        </Button>
      </div>
      <div className='left'>
        <Button
          m_type={ButtonTypeEnum.Icon}
          m_color={ButtonColorEnum.Secondary}
          onClick={() => {}}
        >
          <FormattedIcon name='FaChevronLeft' />
        </Button>
      </div>

      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        {/* <Draggable dragAreaRef={dragAreaRef}><div style={{width: '50px', height:'50px', backgroundColor: 'yellow'}}></div></Draggable> */}
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

      {activeChooseModal && <div className='modal' style={{top: `${modalPos.posY}px`, left: `${modalPos.posX}px`}}>
        <h4>What do you want to create?</h4>
        <div className='option-btn-group'>
          <Button
            m_color={ButtonColorEnum.Primary}
            onClick={() => chooseType(TreeNodeTypeEnum.Category)}
          >{TreeNodeTypeEnum.Category.toUpperCase()}</Button>
          <Button
            m_color={ButtonColorEnum.Primary}
            onClick={() => chooseType(TreeNodeTypeEnum.Service)}
          >{TreeNodeTypeEnum.Service.toUpperCase()}</Button>
        </div>
      </div>}
    </div>
  )
}

export default DragArea;