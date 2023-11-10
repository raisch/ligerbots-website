const { Article } = require('../../models/Article')

module.exports = {
  name: 'articles',
  model: Article,
  data: [
    {
      title: 'This is an article.',
      description: 'This is a description of the article.',
      date: '2023-01-01',
      kind: 'blogpost',
      markdown: '# Hello World! \n This is the content of my first blog post.'
    }
  ]
}
