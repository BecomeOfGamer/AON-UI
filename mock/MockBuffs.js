import Buff from '../src/interface/Buff'

const MockBuffs = []
let buff

buff = new Buff()
buff.Name = '暈車'
buff.Webpath = 'assets/buff/stun.png'
buff.BuffTips = '坐車上山，山區顛簸暈眩，持續0.2秒。'
buff.Tips = {
  header: '暈車',
  content: '坐車上山，山區顛簸暈眩，持續{0}秒。',
  unic: '',
  nums: ['(0.2/0.4/0.6)'],
}
MockBuffs.push(buff)

buff = new Buff()
buff.Name = '暈船'
buff.Webpath = 'assets/buff/stun.png'
buff.BuffTips = '被異性敵軍騙得團團轉，受其魅惑，持續1秒。'
buff.Tips = {
  header: '暈船',
  content: '被異性敵軍騙得團團轉，受其魅惑，持續{0}秒。',
  unic: '唯一專情，狀態期間免疫其他異性敵軍。',
  nums: ['(1/2/3)'],
}
MockBuffs.push(buff)

export default MockBuffs
