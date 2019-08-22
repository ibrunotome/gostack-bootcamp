import React, { useState, useEffect, useMemo, useCallback } from 'react'

function App () {
  const [tech, setTech] = useState(['ReactJS', 'React Native'])
  const [newTech, setNewTech] = useState('')

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech])
    setNewTech('')
  }, [newTech, tech])

  useEffect(() => {
    const storageTech = window.localStorage.getItem('tech')

    if (storageTech) {
      setTech(JSON.parse(storageTech))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('tech', JSON.stringify(tech))
  }, [tech])

  const techSize = useMemo(() => tech.length, [tech])

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  )
}

export default App
