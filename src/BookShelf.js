import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    // query: ''
  }

  render() {
    const { books, title } = this.props

    let showingBooks
    showingBooks = books

    showingBooks.sort(sortBy('title'))
    // console.log('Props', contacts)
    return (

      <div className="bookshelf">

        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">

          <ol className="books-grid">

            {showingBooks.map(book => 
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors[0]}</div>
                </div>
              </li>
            )}

          </ol>

        </div>

      </div>


    )
  }
}

export default BookShelf