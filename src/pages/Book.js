import WatchComponent from '../components/WatchComponent';

function Book() {
    return (
        <div class="list-page">
            <div className="section-header">
                <img src="https://blog.libro.fm/wp-content/uploads/Libro.fms-Picks-More-of-the-Best-Books-of-the-21st-Century-1.jpg" alt="" />
                <h2>Books</h2>
            </div>
            <div className="list-container-wrapper">
            <WatchComponent type='book'/>
            </div>
        </div>
    );
}

export default Book;
