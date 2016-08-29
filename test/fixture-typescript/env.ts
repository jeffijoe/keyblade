import { keyblade } from '../../lib/keyblade'

interface ITestEnv {
  TEST: boolean
}

export default keyblade<ITestEnv>({
  TEST: true
}, {
  ignore: ['WEE'],
  message: (key) => 'nope'
})
