import React from 'react'
import Link from 'next/link'
import Head from 'next/Head'

import withAnalytics from '../src/hocs/withAnalytics'

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <Link href="/users">
      <a>Usuários</a>
    </Link>
  </div>
)

export default withAnalytics()(Home);
