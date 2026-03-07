import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { skills } from '../content'

const data = skills.map(s => ({ subject: s.name, A: s.level }))

export const SkillsRadar: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 340 }} className="bg-black/40 border border-primary/10 rounded-lg p-4">
      <ResponsiveContainer>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
          <PolarGrid stroke="#062" />
          <PolarAngleAxis dataKey="subject" stroke="#9effc8" />
          <PolarRadiusAxis angle={30} domain={[0,100]} />
          <Radar name="Skill" dataKey="A" stroke="#00ff41" fill="#00ff41" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SkillsRadar
