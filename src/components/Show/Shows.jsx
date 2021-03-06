import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAddShow } from '../../actions/shows'
import ShowTile from './ShowTile'
import { searchForShows } from '../../utils/api'

import './shows.css'

class Shows extends Component {
  state = { value: '' }
  // need to change this... just a simple way to get a console log of the fetch
  // possibly make a modal?
  handleChange = e => this.setState({ value: e.target.value }, () => searchForShows(this.state.value))
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(handleAddShow(this.state.value))
    this.setState({ value: '' })
  }
  render() {
    const { shows } = this.props
    const AllShows = () => {
      if (shows) {
        return shows
          .sort((a, b) => a.name > b.name)
          .map(show => <ShowTile key={show.name} show={show} />)
      }
      return <div />
    }
    return (
      <Fragment>
        <div>
          <form name="get-show-form" onSubmit={this.handleSubmit}>
            <label htmlFor="get-show-form">
              Add Show:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {AllShows()}
      </Fragment>
    )
  }
}

function mstp({ shows }) {
  return { shows }
}

export default connect(mstp)(Shows)
