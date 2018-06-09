import Skill from '../src/interface/Skill'

const mockSkills = []
let skill

skill = new Skill()
skill.Name = '褶裙'
skill.Webpath = 'assets/skill/a02/a02_1.png'
skill.CanLevelUp = true
skill.Description = '移動速度+45。'
skill.Tips = {
  header: '褶裙',
  content: '移動速度+45。',
  unic: '唯一持有，移動速度不得累計。',
  nums: [],
}
mockSkills.push(skill)

skill = new Skill()
skill.Name = '三河魂'
skill.Webpath = 'assets/skill/a02/a02_2.png'
skill.CanLevelUp = false
skill.Description = '施放自身的王者之氣，能增加周圍1500友軍15的防禦和20的跑速。'
skill.Tips = {
  header: '三河魂',
  content: '施放自身的王者之氣，能增加周圍1500友軍{0}的防禦和{0}的跑速。',
  unic: '',
  nums: ['(15/25/35)', '(20/30/40)'],
}
mockSkills.push(skill)

skill = new Skill()
skill.Name = '變硬'
skill.Webpath = 'assets/skill/a02/a02_3.png'
skill.CanLevelUp = true
skill.Description = '遇到異性友軍變硬，能增加自身5的精神力和10的傷害力，持續5秒。'
skill.Tips = {
  header: '變硬',
  content: '遇到異性友軍變硬，能增加自身{0}的精神力和{0}的傷害力，持續{0}秒。',
  unic: '唯一擁有，不得與友軍共用。',
  nums: ['(5/10/15)', '(10/20/30)', '(5/6/7)'],
}
mockSkills.push(skill)

skill = new Skill()
skill.Name = '長槍'
skill.CanLevelUp = false
skill.Webpath = 'assets/skill/a02/a02_4.png'
skill.Description = '攻擊傷害+14。'
skill.Tips = {
  header: '長槍',
  content: '攻擊傷害+14。',
  unic: '',
  nums: [],
}
mockSkills.push(skill)

export default mockSkills
