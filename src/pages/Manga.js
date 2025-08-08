import WatchComponent from '../components/WatchComponent';

function Manga() {
    return (
        <div id="manga">
            <div className="section-header">
                <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/10/shonen-jump-manga.jpg" alt="" />
                <h2>Manga</h2>
            </div>
            <WatchComponent type='manga'/>
        </div>
    );
}

export default Manga;
