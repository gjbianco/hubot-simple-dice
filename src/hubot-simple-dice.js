module.exports = (robot) => {

  robot.hear(/!(?:roll|dice) help$/i, res => {
    res.send(`
       !roll 6    -> roll 6 sided die
       !roll 6 3x -> roll 6 sided die 3 times
    `)
  })

  robot.hear(/^!(?:roll|dice) (\d+)(?: (\d+)x)?$/i, res => {
    axios({
      method: 'get',
      path: `https://www.random.org/integers/?num=${Math.min(res.match[2], 20)}&min=1&max=${Math.min(res.match[1], 1000000000)}&col=1&base=10&format=plain&rnd=new`
    })
    .then(response => (response.data))
    .then(numbers => {
      res.send(numbers)
    })
    .catch(err => {
      console.log(err)
      res.send('error getting numbers')
    })
  })

}
