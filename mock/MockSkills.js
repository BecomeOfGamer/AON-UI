import Skill from '../src/interface/Skill'

const mockSkills = []
let skill

skill = new Skill()
skill.Name = '褶裙'
skill.Toggle = true
skill.Webpath = 'skill/a02/a02_1.png'
skill.CanLevelUp = true
skill.MaxLevel = 4
skill.CurrentLevel = 1
skill.Description = '移動速度+45。'
skill.Tips = {
  header: '褶裙',
  content: '移動速度<num>+45<num>。<br /><br /><unique>唯一持有，移動速度不得累計。</unique>',
}
mockSkills.push(skill)

skill = new Skill()
skill.Name = '三河魂'
skill.Toggle = false
skill.Webpath = 'skill/a02/a02_2.png'
skill.CanLevelUp = false
skill.MaxLevel = 4
skill.CurrentLevel = 4
skill.Description = '施放自身的王者之氣，能增加周圍1500友軍15的防禦和20的跑速。'
skill.Tips = {
  header: '三河魂',
  content: '施放自身的王者之氣，能增加周圍<num>(15/25/35)</num>友軍<num>20</num><str>(+10)</str>的防禦和<num>30</num><agi>(+10)</agi>的跑速。',
}
mockSkills.push(skill)

skill = new Skill()
skill.Name = '變硬'
skill.Toggle = true
skill.Webpath = 'skill/a02/a02_3.png'
skill.CanLevelUp = true
skill.MaxLevel = 3
skill.CurrentLevel = 2
skill.Description = '遇到異性友軍變硬，能增加自身10的精神力和15的傷害力，持續5秒。'
skill.Tips = {
  header: '變硬',
  content: '遇到異性友軍變硬，能增加自身<num>10</num><int>(+10)</int>的精神力和<num>15</num><str>(+5)</str>的傷害力，持續<num>5</num>秒。<br /><br /><unique>唯一擁有，不得與友軍共用。</unique>',
}
mockSkills.push(skill)

skill = new Skill()
skill.Name = '長槍'
skill.Toggle = false
skill.CanLevelUp = false
skill.MaxLevel = 4
skill.CurrentLevel = 3
skill.MaxLevel = 3
skill.CurrentLevel = 1
skill.Webpath = 'skill/a02/a02_4.png'
skill.Description = '攻擊傷害+14。'
skill.Tips = {
  header: '長槍',
  content: '攻擊傷害<num>+14</num>。',
}
mockSkills.push(skill)

export default mockSkills
