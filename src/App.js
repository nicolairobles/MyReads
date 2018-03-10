import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)

      this.setState((state) => ({
        currentlyReading: books.filter((book) => book.shelf === "currentlyReading")
      }))

      this.setState((state) => ({
        wantToRead: books.filter((book) => book.shelf === "wantToRead")
      }))

      this.setState((state) => ({
        read: books.filter((book) => book.shelf === "read")
      }))

      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            
            <div className="list-books-content">
              <div>

                <BookShelf title="Read" books={this.state.read}/>
                <BookShelf title="Currently Reading" books={this.state.currentlyReading}/>
                <BookShelf title="Want To Read" books={this.state.wantToRead}/>

              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>

          </div>
      </div>
    )
  }
}

export default BooksApp
