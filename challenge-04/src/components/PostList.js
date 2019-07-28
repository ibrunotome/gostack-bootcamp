import React, { Component } from 'react'

import Post from './Post'

class PostList extends Component {
  state = {
    posts: [
      {
        id: 2,
        author: {
          name: 'Bruno Tomé',
          avatar: 'https://avatars0.githubusercontent.com/u/4256471?s=460&v=4',
        },
        date: '28 Jul 2019',
        content:
          'Sensacional o Bootcamp, só sugiro não chamar GoStack pra não induzir a "uma stack com golang".',
        comments: [
          {
            id: 2,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4',
            },
            date: '28 Jul 2019',
            content:
              'Boa! Vamos analisar a sugestão! O nome na verdade faz uma referência a velocidade, ir direto ao ponto.',
          },
        ],
      },
      {
        id: 1,
        author: {
          name: 'Jefferson Otoni Lima',
          avatar: 'https://avatars2.githubusercontent.com/u/1092879?s=460&v=4',
        },
        date: '28 Jul 2019',
        content:
          'Nem só de javascript vive o homem! Dia 10/08 em BH vamos pegar pesado no workshop "Go do zero ao deploy". Bora?',
        media: 'https://images.sympla.com.br/5d1e3ef34951a-lg.png',
        comments: [
          {
            id: 1,
            author: {
              name: 'Bruno Tomé',
              avatar:
                'https://avatars0.githubusercontent.com/u/4256471?s=460&v=4',
            },
            date: '28 Jul 2019',
            content: 'Tô dentro!',
          },
        ],
      },
    ],
  }

  render() {
    const { posts } = this.state

    return (
      <div className="posts">
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    )
  }
}

export default PostList
