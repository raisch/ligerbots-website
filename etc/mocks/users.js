const { User } = require('../../models/User')

module.exports = {
  name: 'Users',
  model: User,
  data: [
    {
      firstName: 'John',
      lastName: 'User',
      imageUrl: 'http://...',
      kind: 'student',
      grade: 10,
      // slug: 'john-user', // auto-generated
      createdBy: 'unknown',
      updatedBy: 'unknown'
    },
    {
      firstName: 'Rob',
      lastName: 'Raisch',
      imageUrl: 'http://...',
      kind: 'mentor',
      // slug: 'john-user', // auto-generated
      createdBy: 'unknown',
      updatedBy: 'unknown'
    }
  ]
}
