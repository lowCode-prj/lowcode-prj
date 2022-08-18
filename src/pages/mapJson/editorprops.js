export const VisualEditorPropsType = {
  /** 输入框 */
  input: "input",
  /** 数字输入框 */
  inputNumber: "InputNumber",
  unitInputNumber: "unitInputNumber",
  /** 颜色选择器 */
  color: "color",
  /* 渐变色选择器 */
  gradient: "gradient",
  /* 文本阴影 */
  textShadow: "text-shadow",
  /** 下拉选择器 */
  select: "select",
  /** 表格 */
  table: "table",
  /** 开关 */
  switch: "switch",
  /** 单选 */
  radio: "radio",
  group: "group",
  colorBlock: "colorBlock",
  IconBlock: "IconBlock",
  imgUpload: "imgUpload",
  checkbox: "checkbox",
  /** 输入框组 */
  inputGroup: "inputGroup"
}

/**
 *
 * @param {*} param0
 * @returns
 * @description input框
 */
export function createEditorInputGroupProp({ label, defaultValue, tips }) {
  return {
    type: VisualEditorPropsType.inputGroup,
    label,
    tips,
    defaultValue,
  }
}

/**
 *
 * @param {*} param0
 * @returns
 * @description input框
 */
export function createEditorInputProp({ label, defaultValue, tips }) {
  return {
    type: VisualEditorPropsType.input,
    label,
    tips,
    defaultValue,
  }
}
/**
 *
 * @param {*} param0
 * @returns
 * @description 开关
 */
export function createEditorSwitchProp({ label, defaultValue, tips }) {
  return {
    type: VisualEditorPropsType.switch,
    label,
    tips,
    defaultValue,
  }
}
/**
 *
 * @param {*} param0
 * @returns
 * @description 数字输入框
 */
export function createEditorInputNumberProp({ label, defaultValue, max, min, tips }) {
  return {
    type: VisualEditorPropsType.inputNumber,
    label,
    tips,
    max,
    min,
    defaultValue,
  }
}

/**
 *
 * @param {*} param0
 * @returns
 * @description 带单位的数字输入框
 */
export function createEditorUnitInputNumberProp({ label, defaultValue, max, min, tips, unit }) {
  return {
    type: VisualEditorPropsType.unitInputNumber,
    label,
    tips,
    max,
    min,
    defaultValue,
    unit,
  }
}

/**
 *
 * @param {*} param0
 * @returns
 * @description 颜色选择框
 */

export function createEditorColorProp({ label, defaultValue }) {
  return {
    type: VisualEditorPropsType.color,
    label,
    defaultValue,
  }
}

/**
 *
 * @param {string} label 标签
 * @description 渐变色选择器
 */
export function createEditorGradientProp({ label, defaultValue }) {
  return {
    type: VisualEditorPropsType.gradient,
    label,
    defaultValue,
  }
}

/**
 * @description 文字阴影
 * @param {*} param0
 * @returns
 */
export function createEditorTextShadowProp({ label, defaultValue }) {
  return {
    type: VisualEditorPropsType.textShadow,
    label,
    defaultValue,
  }
}

/**
 *
 * @param {*} param0
 * @returns
 * @description 创建下拉框
 */
export function createEditorSelectProp({ label, options, defaultValue, tips, multiple }) {
  return {
    type: VisualEditorPropsType.select,
    label,
    defaultValue,
    tips,
    options,
    multiple,
  }
}
/**
 *
 * @param {*} param0
 * @returns
 * @description 单选框
 */
export function createEditorRadioProp({ label, options, defaultValue, radioType, size }) {
  return {
    type: VisualEditorPropsType.radio,
    label,
    defaultValue,
    options,
    radioType,
    size,
  }
}

export function createEditorUnitedGroup({ label, children, defaultValue }) {
  return {
    type: VisualEditorPropsType.group,
    label,
    children,
    defaultValue,
  }
}
/**
 *
 * @param {*} param0
 * @returns
 * @description 颜色块
 */
export function createEditorColorBlock({ label, defaultValue }) {
  if (!defaultValue) {
    defaultValue = [
      "#1EE4E4",
      "#7262fd",
      "#65789b",
      "#f6bd16",
      "#61ddaa",
      "#78d3f8",
      "#9661bc",
      "#f6903d",
      "#008685",
      "#f08bb4",
    ]
  }
  return {
    label,
    type: VisualEditorPropsType.colorBlock,
    defaultValue: [...defaultValue],
  }
}

/**
 *
 * @param {*} param0
 * @returns
 * @description 图标块
 */
export function createEditorIconBlock({ label, defaultValue }) {
  return {
    label,
    type: VisualEditorPropsType.IconBlock,
    defaultValue,
  }
}

export function createEditorImgUpload({ label, defaultValue }) {
  return {
    label,
    type: VisualEditorPropsType.imgUpload,
    defaultValue,
  }
}

/**
 *
 * @param {*} param0
 * @returns
 * @description 单选框
 */
export function createEditorCheckboxProp({ label, options, defaultValue, border, size }) {
  return {
    type: VisualEditorPropsType.checkbox,
    label,
    defaultValue,
    options,
    border,
    size,
  }
}
