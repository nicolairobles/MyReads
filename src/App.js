import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    bookshelves: [
      {
        title: "currentlyReading",
        text: "Currently Reading"
      },
      {
        title: "wantToRead",
        text: "Want To Read"
      },
      {
        title: "read",
        text: "Read"
      }
    ],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books})
    })
  }

  createContact(contact) {
    BooksAPI.create(contact).then(contact=> {
      this.setState(state=>({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  updateBook = (updatedBook, shelf) => {

    console.log("updateBook clicked")
    console.log("shelf: " + shelf)
    console.log("updatedBook.title: " + updatedBook.title)

    let tempBook = this.state.books.filter(x => 
      x.id === updatedBook.id
    )

    if (tempBook[0] === undefined ){
      tempBook = [updatedBook]
    } else {
      console.log("tempBook shelf before: " + tempBook[0].shelf)
    }


    tempBook[0].shelf = shelf

    console.log("tempBook after: " + tempBook[0].shelf)

    let tempBooks = this.state.books.filter(x => 
      x.id !== updatedBook.id
    )

    console.log("tempBooks")
    console.log(tempBooks)

    tempBooks.push(tempBook[0])

    console.log("tempBooks")
    console.log(tempBooks)


    this.setState((state) => ({
      books: tempBooks
    }))

    console.log(this.state.books)

    BooksAPI.update(updatedBook, shelf)

  }


  render() {

    const { books, bookshelves } = this.state

    return (

      <div className="app">

     {/*  Main Page Route */}

        <Route exact path='/' 
          render={() => (

            <div className="list-books">

              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                <div>

                { bookshelves.map(bookshelf => 
                  <BookShelf 
                    key={bookshelf.title} 
                    text={bookshelf.text} 
                    title={bookshelf.title} 
                    books={books}
                    onUpdateBook={this.updateBook} 
                  />
                )}

                </div>
              </div>

              <div className="open-search">
                <Link to='/search' className='open-search'>
                  Search books            
                </Link>
              </div>

            </div>

          )}
        />


     {/*  Search Page Route */}

       <Route exact path='/search' 
         render={() => (

          <SearchBooks  
            books={books}
            onUpdateBook={this.updateBook} 
          />

         )}
       />



      </div>
    )
  }
}

export default BooksApp
