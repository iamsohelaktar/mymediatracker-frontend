import WatchComponent from '../components/WatchComponent';

function Book() {
    return (
        <div id="book">
            <div className="section-header">
                <img src="https://blog.libro.fm/wp-content/uploads/Libro.fms-Picks-More-of-the-Best-Books-of-the-21st-Century-1.jpg" alt="" />
                <h2>Books</h2>
            </div>
            <WatchComponent type='book'/>
        </div>
    );
}

export default Book;
