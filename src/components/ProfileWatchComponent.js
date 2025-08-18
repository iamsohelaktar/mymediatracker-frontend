const ProfileWatchComponent = ({type, watchList}) => {

    const filteredList = [...watchList].filter(item => item.type===type);

    return (
            <div className="list-container">
            {filteredList.length === 0 && <p>Looks like there's nothing here...</p>}
            {filteredList.length > 0 && filteredList.map((media, i) => {
                const savedRating  = media?.rating || '';
                const savedProgress = media?.progress || '';
                const savedStatus = media?.status || '';

                let status;

                switch (savedStatus){
                    case "done":
                        status =  ['anime','movie', 'tv'].includes(type) ? <div className="status">✔ Watched</div> : (['manga','book'].includes(type) ? <div className="status">✔ Read</div> : <div className="status">✔ Played</div> )
                        break;
                    case "to-do":
                        status =  ['anime','movie', 'tv'].includes(type) ? <div className="status">👁 Plan to Watch</div> : (['manga','book'].includes(type) ? <div className="status">👁 Plan to Read</div> : <div className="status">👁 Plan to Play</div> )
                        break;
                    case "doing":
                        status =  ['anime','movie', 'tv'].includes(type) ? <div className="status">▶ Watching</div> : (['manga','book'].includes(type) ? <div className="status">▶ Reading</div> : <div className="status">▶ Playing</div> )
                        break;
                    case "on-hold":
                        status =  <div className="status">❚❚ On Hold</div>
                        break;
                    default:
                        break;
                }

                return (
                    <div className="search-result" key={media._id}>
                        <img className="cover" loading="lazy" src={media.image_url} alt={media.name}/>
                        <div className="info">
                            <div className="title" title={media.name + " | Added " + media?.createdAt.slice(0,10)}><p>{media.name}</p></div>
                            <div className="more-info">
                                <div className="rating">
                                    {savedRating === 5 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 4 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 3 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 2 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                    {savedRating >= 1 ? <div className="fa fa-star yes"></div> : <div className="fa fa-star"></div>}
                                </div>
                                {['anime', 'book', 'manga', 'tv', 'game'].includes(type) && ['doing', 'on-hold'].includes(media.status) && savedProgress && <div className="episodes"><p>Progress: {savedProgress}</p></div>}
                                {status}
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
    );
}
 
export default ProfileWatchComponent;