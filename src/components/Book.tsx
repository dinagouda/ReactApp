import { ShelvesType } from "../defines/defines";
import { Book as BookInterface } from "../models/book";
const Book: React.FC<{
    book: BookInterface,
    currentShelf: string,
    onChangeShelf: (book: BookInterface, selectedShelf: string) => void
}> = (props) => {

    const handleShelfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChangeShelf(props.book, event.target.value)
    };


    let hasThumbnail: string = "";
    if (props.book.imageLinks) {
        hasThumbnail = props.book.imageLinks.thumbnail
    }
    const bookCover = (<div data-testid="bookCover" className="book-cover" style={{
        width: 128,
        height: 193,
        backgroundImage: `url("${hasThumbnail}")`
    }}></div>);

    return (
        <div className="book">
            <div className="book-top">
                {hasThumbnail && bookCover}
                <div className="book-shelf-changer" >
                    <select  onChange={handleShelfChange} value={props.currentShelf} data-testid="selectShelf">
                        <option value="move" disabled>Move to...</option>
                        <option data-testid="currentlyReading" value={ShelvesType.CurrentlyReading}>Currently Reading</option>
                        <option data-testid="wantToRead" value={ShelvesType.WantToRead}>Want to Read</option>
                        <option data-testid="read" value={ShelvesType.Read}>Read</option>
                        <option data-testid="none" value={ShelvesType.None}>None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors}</div>
        </div>
    );
};

export default Book;