import React, { useState, useRef } from 'react'
import { useField } from '@rocketseat/unform'
import { MdAddAPhoto } from 'react-icons/md'

import api from '~/services/api'

import { Container } from './styles'

export default function CoverInput () {
  const { defaultValue } = useField('cover')

  const [file, setFile] = useState(defaultValue && defaultValue.id)
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)
  const ref = useRef()

  async function handleChange (e) {
    const data = new FormData()
    data.append('file', e.target.files[0])

    const response = await api.post('files', data)
    const { id, url } = response.data

    document.getElementById('file_id').value = id

    setFile(id)
    setPreview(url)
  }

  return (
    <Container>
      <label htmlFor="cover">
        {preview && <img src={preview} alt="Cover" />}

        {!preview && (
          <div>
            <MdAddAPhoto size={48} color="rgba(255, 255, 255, .7)" />
            <strong>Selecionar Imagem</strong>
          </div>
        )}

        <input
          type="file"
          id="cover"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  )
}
