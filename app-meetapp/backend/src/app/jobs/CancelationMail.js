import Mail from '../../lib/Mail'

class CancelationMail {
  get key () {
    return 'CancelationMail'
  }

  async handle ({ data }) {
    const { meetup, user } = data

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `[${meetup.title}] Cancelamento de Inscrição`,
      template: 'cancelation',
      context: {
        organizer: meetup.user.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email
      }
    })
  }
}

export default new CancelationMail()
