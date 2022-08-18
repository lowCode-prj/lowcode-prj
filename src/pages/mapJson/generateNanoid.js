import { customAlphabet } from 'nanoid'
/**
 * @description 生成nanoid
 */
 export const generateNanoid = customAlphabet('1234567890abcdef', 10)