import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import {
  Container, Table, TableBody, TableRow, TableCell, Grid, Image, Menu as SemMenu,
  GridColumn, Form, Button, FormField, Message, Header, Statistic, Segment
} from 'semantic-ui-react'

const Menu = () => (
  <SemMenu inverted>
    <SemMenu.Item link>
      <NavLink exact to="/" activeStyle={activeMenuStyle}>anecdotes</NavLink>&nbsp;
    </SemMenu.Item>
    <SemMenu.Item link>
      <NavLink exact to="/create" activeStyle={activeMenuStyle}>create new</NavLink>&nbsp;
    </SemMenu.Item>
    <SemMenu.Item link>
      <NavLink exact to="/about" activeStyle={activeMenuStyle}> about</NavLink>&nbsp;
    </SemMenu.Item>
  </SemMenu>
)

// const Menu = () => (
//   <div style={menuStyle}>
//     <NavLink exact to="/" activeStyle={activeMenuStyle}>anecdotes</NavLink>&nbsp;
//     <NavLink exact to="/create" activeStyle={activeMenuStyle}>create new</NavLink>&nbsp;
//     <NavLink exact to="/about" activeStyle={activeMenuStyle}> about</NavLink>&nbsp;
//   </div>
// )

const activeMenuStyle = {
  fontWeight: 'bold',
  color: 'lightblue',
  backgroundColor: 'grey',
  padding:15
}

const menuStyle = {
  borderStyle: 'solid',
  borderWidth: 2,
  borderColor: 'purple',
  backgroundColor: 'lightblue',
  margin: 10,
  fontSize: 22,
  padding: 15
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table celled fixed singleLine>
      <TableBody>
        <ul>
          {anecdotes.map(anecdote =>
            <TableRow key={anecdote.id} >
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </TableCell>
            </TableRow>)}
        </ul>
      </TableBody>
    </Table>
  </div>
)


const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <Header size='huge'>{anecdote.content}</Header>
      <Header size='large'>by {anecdote.author}</Header>
      <Statistic>
        <Statistic.Label> Votes </Statistic.Label>
        <Statistic.Value>{anecdote.votes}</Statistic.Value>
      </Statistic>
      <Segment> For more info see <a href={anecdote.info}>{anecdote.info}</a></Segment>
    </div>
  )
}

const About = () => (
  <Grid columns={2}>
    <GridColumn>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </GridColumn>
    <GridColumn>
      <Image src='https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg' />
    </GridColumn>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

const notificationStyle = {
  borderStyle: 'solid',
  borderWidth: 3,
  borderRadius: 10,
  borderColor: 'green',
  margin: 10,
  color: 'green',
  fontStyle: 'italic bold',
  fontSize: 18
}

const Notification = ({ notification }) => {
  return (
    <Message success>
      {notification}
    </Message>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormField>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </FormField>
          <FormField>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </FormField>
          <FormField>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </FormField>
          <Button type='submit'>create</Button>
        </Form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `You have added ${anecdote.content}`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
  }

  render() {
    return (
      <Container>
        <div>
          <Header as='h1'>Software anecdotes</Header>
          <Router>
            <div>
              <Menu />
              {this.state.notification ? <Notification notification={this.state.notification} /> : null}
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/anecdotes/:id" render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
              <Route path="/create" render={({ history }) => <CreateNew addNew={this.addNew} history={history} />} />
              <Route path="/about" render={() => <About />} />
            </div>
          </Router >
          <Footer />
        </div>
      </Container>
    );
  }
}

export default App;
