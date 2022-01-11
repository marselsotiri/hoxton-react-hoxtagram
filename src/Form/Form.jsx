import './Form.css'

function Form() {
    return < form className="comment-form image-card" >
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