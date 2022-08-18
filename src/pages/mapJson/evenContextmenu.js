import store from '@/store/index';
export default function closeContextmenu(e) {
    e.stopPropagation()
    e.preventDefault()
    let target = e.target
    let top = e.offsetY
    let left = e.offsetX
    let width=getCell(target)
    let height=getRow(target)
    // debugger
    let Header=getHeader(target)
    let scrollHeight=getScroll(target)
    target = getNode(target)
    let translateLeft = target.style.transform.slice(10, -1).split(",")[0].slice(0, -2)
    let translateRight = target.style.transform.slice(10, -1).split(",")[1].slice(0, -2)

    

    left += translateLeft * 1 + width
    top += translateRight * 1 + height + Header -scrollHeight
    let domAndIndex = {}
    for (let i = 0; i < store.state.canvasData.jsonData.blocks.length; i++) {
        const item = store.state.canvasData.jsonData.blocks[i];
        if (item._vid == target.getAttribute('domid')) {
            domAndIndex.dom = item
            domAndIndex.index = i
        }
    }
    // debugger
    // this.onActivated(domAndIndex.dom, domAndIndex.index)
    // this.$bus.$emit("onActivated",domAndIndex);
    // console.log(Vue)
    store.commit('contextmenu/setCurComponent', domAndIndex)
    store.commit('contextmenu/showContextMenu', {
        top,
        left
    })
    return domAndIndex
}
export function getNode(node) {
    if (node.className.includes('vdr')) {
        return node
    } else {
        return getNode(node.parentNode)
    }
}
export function getCell(node) {
    if (node.nodeName=="TD") {
        let index=node.cellIndex
        let width=0
        for (let i = 0; i < index; i++) {
            const element = node.parentNode.children[i];
            width=width+element.offsetWidth
        }
        return width
    }else if(node.className.includes('vdr')){
        return width=0
    } else {
        return getCell(node.parentNode)
    }
}
export function getRow(node) {
    
    if (node.nodeName=="TR") {
        let index=node.rowIndex
        let height=0
        for (let i = 0; i < index; i++) {
            const element = node.parentNode.children[i];
            height=height+element.offsetHeight
        }
        return height
    } else {
        return getRow(node.parentNode)
    }
}
export function getHeader(node) {
    
    if (node.className.includes('ivu-table-body')) {
        return node.parentNode.children[0].offsetHeight
    } else {
        return getHeader(node.parentNode)
    }
}
export function getScroll(node) {
    
    if (node.className.includes('ivu-table-body')) {
        return node.scrollTop
    } else {
        return getScroll(node.parentNode)
    }
}