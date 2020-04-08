import React from 'react'
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import HomeComponent from './HomeComponent'
import './App.css'
import SearchComponent from './SearchComponent';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route path='/search' component={SearchComponent} />
        <Route exact path='/' component={HomeComponent} />
      </div>
    )
  }
}

export default BooksApp
