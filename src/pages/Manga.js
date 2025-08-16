import WatchComponent from '../components/WatchComponent';

function Manga() {
    return (
        <div class="list-page">
            <div className="section-header">
                <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2023/10/shonen-jump-manga.jpg" alt="" />
                <h2>Manga</h2>
            </div>
            <div className="list-container-wrapper">
                <WatchComponent type='manga'/>
            </div>
        </div>
    );
}

export default Manga;
