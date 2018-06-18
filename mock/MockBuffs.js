import Buff from '../src/interface/Buff'

const MockBuffs = []
let buff

buff = new Buff()
buff.Name = '暈車'
buff.Webpath = 'buff/stun.png'
buff.BuffTips = '坐車上山，山區顛簸暈眩，持續 1 秒。'
buff.Tips = {
  header: '暈車',
  content: '坐車上山，山區顛簸暈眩，持續<num>1</num>秒。',
}
MockBuffs.push(buff)

buff = new Buff()
buff.Name = '暈船'
buff.Webpath = 'buff/stun.png'
buff.BuffTips = '被異性敵軍騙得團團轉，受其魅惑，持續1秒。'
buff.Tips = {
  header: '移形之體',
  content: '菲歐拉向前戳刺一個敵方目標，造成<num>70</num><str>(+11)</str>物理傷害並附帶命中觸發效果。優先攻擊<heavy>破綻</heavy>和能夠擊殺的目標。<br /><br />如果這個技能擊中敵方目標，會返回<num>60%</num>的領卻時間。<br /><br /><unique>只能攻擊異性。</unique>',
}
MockBuffs.push(buff)

export default MockBuffs
