import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'
// import { Book } from './BookShelf'

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  }

  state = {
    searchedBooks: [],
    query: '',
  }

  updateQuery = (query) => {

    this.setState({query: query })

    if (this.state.query) {

      // find ownedBooks that match the query
      const match = new RegExp(escapeRegExp(query), 'i')
      let ownedBooks = this.props.books.filter((book) => match.test(book.title))

      // find the books that match the query from BooksAPI
      BooksAPI.search(query).then((data) => {
        if (data === undefined || data.error) {
          this.setState({searchedBooks: []})
        } else {
          
          this.setState({searchedBooks: data})

          // delete the duplicate data from the queryData and enter your ownedBooks data
          ownedBooks.map((ownedBook) => {
            let remainingBooks = this.state.searchedBooks.filter((searchedBook) => searchedBook.title !== ownedBook.title)
            console.log("remainingBooks")
            console.log(remainingBooks)
            remainingBooks.push(ownedBook)
            this.setState({searchedBooks: remainingBooks})
          })

        }
      })

    } else {
      this.setState({searchedBooks: []})
    }

  }


  render() {
    const { onUpdateBook } = this.props
    const { searchedBooks, query } = this.state


    searchedBooks.sort(sortBy('title'))

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">
            Close            
          </Link>
          <div className="search-books-input-wrapper">

            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            { searchedBooks.map(book => 

              <Book key={book.id} onUpdateBook={onUpdateBook} book={book}/>

            )}

          </ol>
        </div>
      </div>

    )
  }
}


export default SearchBooks


