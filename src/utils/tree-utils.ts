import { FileObjectData } from '../types/interfaces';

// root: Is a tree/file hirachy, which will be overwritten
// node: Node that should be updated
// data: Is the update information for our, generally only a list of children is used

const updateTree = (root: FileObjectData, node: string, data: FileObjectData) => {
    const searchNodeAndModify = (object: FileObjectData | FileObjectData[] | undefined, node: string, data: FileObjectData, prevObject: FileObjectData = {}) => {
        if (object instanceof Array) {
            for (let i = 0; i < object.length; i++) {
                searchNodeAndModify(object[i], node, data, object[i]);
            }
        }
        else {
            if (object?.metaData?.path == node) {
                prevObject.children = data.children
            }
            if (object?.children != [] && object?.children != undefined) {
                searchNodeAndModify(object?.children, node, data, object)
            }
        }
    }
    searchNodeAndModify(root, node, data)
    return root
}

// returns the updated or unchanged root, if no changes could be made

export { updateTree }