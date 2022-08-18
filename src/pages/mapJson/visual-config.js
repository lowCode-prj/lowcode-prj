import { createVisualEditorConfig } from '@/views/editor/editor-util.js'
import baseWidgets from '@/packages/base-widgets'
// import containerComponent from '@/packages/container-component'
import echartsComponent from '@/packages/echarts-component'
export const visualConfig = createVisualEditorConfig()
// 注册基础控件
Object.keys(baseWidgets).forEach((name) =>
  visualConfig.registry('baseWidgets', name, baseWidgets[name])
)
// // 注册容器组件
// Object.keys(containerComponent).forEach((name) =>
//   visualConfig.registry('containerComponents', name, containerComponent[name])
// )
// 注册echarts组件
Object.keys(echartsComponent).forEach((name) =>
  visualConfig.registry('echartsComponents', name, echartsComponent[name])
)