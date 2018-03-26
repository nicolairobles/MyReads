import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class Book extends Component {

  static propTypes: {
    book: React.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    // updateBookOptions: PropTypes.object.isRequired
    // value: React.string.isRequired,
  };

  state = {
    // query: ''
    updateBookOptions: [
        {
          value: "currentlyReading",
          name: "Currently Reading"
        },
        {
          value: "wantToRead",
          name: "Want To Read"
        },
        {
          value: "read",
          name: "Read"
        },
        {
          value: "none",
          name: "None"
        }

    ]
  }

  render() {

    const { book, onUpdateBook } = this.props
    const { updateBookOptions} = this.state

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">

            {book.imageLinks && (
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            )}

            <div className="book-shelf-changer">

              <select onChange={(event) => onUpdateBook(book, event.target.value)} value={ book.shelf === undefined ? "none" : book.shelf}>

                  <option disabled name="Move to..." value="">Move to...</option>
               
                  { updateBookOptions.map((option, index) =>
                    <ChildOption key={index} name={option.name} value={option.value}/>
                  )}

              </select>

            </div>

          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors === undefined ? '' : book.authors[0]}</div>
        </div>
      </li>
    )
  }
}



class ChildOption extends Component {
  static propTypes: {
    name: React.string.isRequired,
    value: React.string.isRequired,
  };

  render() {

    const { name, value } = this.props

    return (
      <option value={value}>{name}</option>
    )
  }
}

export default Book;
