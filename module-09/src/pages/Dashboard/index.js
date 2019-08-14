import React from 'react'
import api from '~/services/api'

export default function Dashboard() {
  api.get('appointments')

  return <h1>Dashboard</h1>
}
