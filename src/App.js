import React from 'react'
import { Route } from 'react-router-dom';
import HomeComponent from './HomeComponent'
import './App.css'
import SearchComponent from './SearchComponent';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: ['currentlyReading', 'wantToRead', 'read']
  }

  componentDidMount() {
    if (this.state.books.length === 0) {
      BooksAPI.getAll()
      .then(books => books.map(book => {
        const b = {
          id: book.id,
          title: book.title,
          authors: book.authors,
          shelf: book.shelf,
          image: book.imageLinks.thumbnail
          }

        return b;
      }))
      .then(books => this.setState({ books: books}));
    }
  }

  updateShelf = (shelfIndex, bookId) => {
    BooksAPI.update({id: bookId}, this.state.shelves[shelfIndex])
      .then(res => {
        this.setState((currentState) => {
          const updatedBooks = currentState.books;
          for (const key in updatedBooks) {
            const book = updatedBooks[key];
            if (res.currentlyReading.includes(book.id)) {
              book.shelf = currentState.shelves[0];
            } else if (res.wantToRead.includes(book.id)) {
              book.shelf = currentState.shelves[1];
            } else if (res.read.includes(book.id)) {
              book.shelf = currentState.shelves[2];
            }
          }

          return updatedBooks;
        });
      });
  }

  render() {
    return (
      <div className="app">
        <Route
          exact path='/' 
          component={() => <HomeComponent shelves={this.state.shelves} books={this.state.books} onUpdateShelf={this.updateShelf} />} 
        />
        <Route
          path='/search' 
          component={() => <SearchComponent books={this.state.books} onUpdateShelf={this.updateShelf} />} />
      </div>
    )
  }
}

export default BooksApp
