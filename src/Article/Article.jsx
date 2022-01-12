import './Article.css'

function Article(props) {
    return <>
        {
            props.searchedImages.map((image) =>

                <article key={image.id} className="image-card">
                    <h2 className="title">{image.title}</h2>
                    <img src={image.image} className="image" />
                    <div className="likes-section">
                        <span className="likes">{image.likes}</span>
                        <button className="like-button"
                            onClick={() => {
                                props.updateLikesOnServer(image)
                            }}
                        >♥</button>
                    </div>
                    <ul className="comments">
                        {image.comments.map((comment) => (
                            <li key={comment.id}>{comment.content}
                                <button
                                    onClick={function () {
                                        props.deleteComment(comment)
                                    }}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                    <form className="comment-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            // @ts-ignore
                            const content = e.target.comment.value
                            // @ts-ignore
                            e.target.reset()

                            props.createCommentOnServer(content, image.id)
                        }

                        }
                    >
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