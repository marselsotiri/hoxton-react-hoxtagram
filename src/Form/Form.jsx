import './Form.css'

function Form(props) {
    return < form className="comment-form image-card"
        onSubmit={(e) => {
            e.preventDefault();
            // @ts-ignore
            const title = e.target.title.value;
            // @ts-ignore
            const url = e.target.image.value;
            // @ts-ignore
            e.target.reset()

            props.postImageOnServer(title, url)

        }
        }
    >
        <h2 className="title">New Post</h2>
        <input
            className="comment-input"
            type="text"
            name="title"
            id="title"
            placeholder="Add a title..."
        />
        <input
            className="comment-input"
            type="url"
            name="image"
            id="image"
            placeholder="Add an image url..."
        />
        <button className="comment-button" type="submit">Post</button>
    </form >
}

export default Form