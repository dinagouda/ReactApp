import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as BooksAPI from "./BooksAPI";
import './App.css';
import BookShelves from './pages/BookShelves';
import Search from './pages/Search';
import { Book as BookInterface } from "./models/book";
import { ShelvesType } from './defines/defines';


function App() {
  const [books, setBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books)
    }
    )
  }, [])

  const changeShelfHandler = async (updatedBook: BookInterface, shelf: string) => {
    await BooksAPI.update(updatedBook, shelf);
    checkIsBookExisted(updatedBook);
    const updatedBooks = books.map(book => {
      if (book.id === updatedBook.id) {
        book.shelf = shelf as ShelvesType;
      }
      return book;
    });
    setBooks(updatedBooks);
  }
  const checkIsBookExisted = (updatedBook: BookInterface) => {
    const isBookExited = books.find(book => book.id === updatedBook.id);
    if (!isBookExited) { books.push(updatedBook) };

  }
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/bookShelves" />
      </Route>
      <Route path="/bookShelves" exact>
        <BookShelves books={books} changeShelfHandler={changeShelfHandler} />
      </Route>
      <Route path="/search" exact>
        <Search books={books} changeShelfHandler={changeShelfHandler} />
      </Route>
    </Switch>
  );
}

export default App;
