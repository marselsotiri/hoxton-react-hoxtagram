import './Article.css'

function Article (props) {
    return <>
        {
            props.images.map((image) =>

                <article key={image.id} className="image-card">
                    <h2 className="title">{image.title}</h2>
                    <img src={image.image} className="image" />
                    <div className="likes-section">
                        <span className="likes">{image.likes}</span>
                        <button className="like-button"
                            onClick={() => {
                                const updatedImages = [...props.images];
                                const imageFound = updatedImages.find(
                                    (targetImage) => image.id === targetImage.id
                                );
                                imageFound.likes++;
                                props.setImage(updatedImages);
                                props.updateLikesOnServer(imageFound);
                            }}
                        >♥</button>
                    </div>
                    <ul className="comments">
                        {image.comments.map((comment) => (
                            <li key={comment.id}>{comment.content}</li>
                        ))}
                    </ul>
                    <form className="comment-form">
                        <input
                            className="comment-input"
                            type="text"
                            name="comment"
                            placeholder="Add a comment..."
                        />
                        <button className="comment-button" type="submit">Post</button>
                    </form>
                </article>

            )
        }
    </>
}
    export default Article