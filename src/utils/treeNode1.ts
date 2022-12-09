import { TreeNodeDatum } from 'react-d3-tree/lib/types/common';

export enum TreeActionEnum {
  Find = 'find',
  Insert = 'insert',
  Update = 'update',
  Remove = 'remove',
  Set_Editable = 'set_Editable',
}

export class Tree1 {
  root: TreeNodeDatum;
  constructor(root: TreeNodeDatum) {
    this.root = root
  }

  /**
   * 
   * @param root 
   * @param keyVal
   * @param action 
   * @param newNode 
   * @returns 
   */
  findByKeyWithAction(rootNode: TreeNodeDatum, keyVal: string, action: TreeActionEnum, newNode: TreeNodeDatum | string, deepNum: number) {
    let findResult = null
    if (rootNode.attributes?.key === keyVal) {
      if (action === TreeActionEnum.Insert) {
        if (typeof(newNode) === 'object') {
          newNode.attributes!.depth = 1
          rootNode.children?.push(newNode)
        }
      }
    }else {
      if (rootNode.children && rootNode.children.length) {
        for (let idx = 0; idx < rootNode.children.length; idx++) {
          if (rootNode.children[idx].attributes?.key === keyVal) {
            if (action === TreeActionEnum.Insert) {
              if (typeof(newNode) === 'object') {
                newNode.attributes!.depth = deepNum + 2
                rootNode.children[idx].children?.push(newNode)
              }
            }else if (action === TreeActionEnum.Remove) {
              rootNode.children.splice(idx, 1)
            } else if (action === TreeActionEnum.Update) {
              if (typeof(newNode) === 'string') {
                rootNode.children[idx].name = newNode
                rootNode.children[idx].attributes!.isEdit = false
              }
            } else if (action === TreeActionEnum.Set_Editable) {
              rootNode.children[idx].attributes!.isEdit = true
            } else if (action === TreeActionEnum.Find) {
              findResult = rootNode.children[idx]
            }
            break
          }else if (rootNode.children[idx].children?.length) {
            deepNum = deepNum + 1
            this.findByKeyWithAction(rootNode.children[idx], keyVal, action, newNode, deepNum)
          }
        };
      }
    }
    if (findResult && TreeActionEnum.Find) return findResult
    else return rootNode;
  }
}

export default Tree1