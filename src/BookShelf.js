import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  }

  render() {

    const { books, text, title, onUpdateBook } = this.props

    let filteredBooks = books.filter((book) => book.shelf === title)

    filteredBooks.sort(sortBy('title'))

    return (

      <div className="bookshelf">

        <h2 className="bookshelf-title">{text}</h2>
        <div className="bookshelf-books">

          <ol className="books-grid">

            { filteredBooks.map(book => 

              <Book key={book.id} onUpdateBook={onUpdateBook} book={book}/>


            )}

          </ol>

        </div>

      </div>


    )
  }
}


export default BookShelf;
