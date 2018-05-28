import 'babel-polyfill'
import jwt from 'jsonwebtoken';

export const decodeKeyTest = 'f3dc198f050426622cc11e92091af24b9a51f9ba9b40a7725cbd2469ae0ab77e19b0862f5c9030e1e131d395e12e15e31950cb03e7c7a2ddb8ae9778880f1221'
export const decodeKeyDev = '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a'

export const key = process.env.NODE_ENV === 'dev' ? decodeKeyDev : decodeKeyTest
export const decodeToken = async (token) => {
  return await jwt.verify(token, key)
}
