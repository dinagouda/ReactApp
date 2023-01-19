import { Book as BookInterface } from "../models/book";
import Book from "../components/Book";
import { ShelvesType } from "../defines/defines";
import { Link } from 'react-router-dom';


const BookShelves: React.FC<{
  books: BookInterface[],
  changeShelfHandler: (book: BookInterface, selectedShelf: string) => void
}> = (props) => {

  const currentlyReadingBooks: BookInterface[] = [];
  const wantToReadBooks: BookInterface[] = [];
  const readBooks: BookInterface[] = [];
  
// filtering books on its shelf
  props.books.forEach(book => {
    switch (book.shelf) {
      case ShelvesType.CurrentlyReading:
        currentlyReadingBooks.push(book)
        break;
      case ShelvesType.WantToRead:
        wantToReadBooks.push(book)
        break;
      case ShelvesType.Read:
        readBooks.push(book)
        break;
    }
  });
  // rendering list for each shelf
  const currentlyReading = currentlyReadingBooks.map(book => (
    <li key={book.id} >
      <Book
        book={book}
        currentShelf={ShelvesType.CurrentlyReading}
        onChangeShelf={props.changeShelfHandler}
      />
    </li>
  ));

  const wantToRead = wantToReadBooks.map(book => (
    <li key={book.id} >
      <Book
        book={book}
        currentShelf={ShelvesType.WantToRead}
        onChangeShelf={props.changeShelfHandler}
      />
    </li>
  ));

  const read = readBooks.map(book => (
    <li key={book.id} >
      <Book
        book={book}
        currentShelf={ShelvesType.Read}
        onChangeShelf={props.changeShelfHandler}
      />
    </li>
  ));
  return (
    <div>
      <div className="list-books-title">
        <h1>MyReads: A Book Tracking App</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 data-testid="currentlyReading" className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  currentlyReading
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 data-testid="wantToRead" className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  wantToRead
                }
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 data-testid="read" className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {
                  read
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookShelves;


