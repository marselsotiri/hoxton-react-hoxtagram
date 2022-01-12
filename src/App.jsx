import { useEffect, useState } from 'react'


import './App.css'
import Article from './Article/Article';

import Form from './Form/Form';

function App() {
  const [images, setImage] = useState([])
  const [search, setSearch] = useState('')

  useEffect(function () {
    fetch("http://localhost:8000/images")
      .then((response) => response.json())
      .then((image) => setImage(image));
  }, []);

  function postImageOnServer(title, src) {
    fetch("http://localhost:8000/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        image: src,
        likes: 0
      })
    }).then((response) => response.json())
      .then((imagePosted) => {
        const copyImage = [...images, imagePosted]
        setImage(copyImage)
      }
      )
  }

  function createCommentOnServer(content, imageId) {
    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: content,
        imageId: imageId
      })
    }).then((response) => response.json())
      .then((commment) => {
        const updatedImages = JSON.parse(JSON.stringify(images))
        const match = updatedImages.find(target => target.id === imageId)
        match.comments.push(commment)
        setImage(updatedImages)
      })
  }

  function deleteComment(comment) {
    // delete comment on server
    fetch(`http://localhost:8000/comments/${comment.id}`, {
      method: 'DELETE'
    })

    // create a copy of the data we want to change
    const imagesCopy = JSON.parse(JSON.stringify(images))

    // change the data
    const imageToChange = imagesCopy.find(image => image.id === comment.imageId)
    imageToChange.comments = imageToChange.comments.filter(
      targetComment => targetComment.id !== comment.id
    )

    // update state
    setImage(imagesCopy)
  }

  function updateLikesOnServer(image) {
    // update the server
    fetch(`http://localhost:8000/images/${image.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: image.likes + 1 })
    })

    // update state
    const updatedImages = JSON.parse(JSON.stringify(images))
    const match = updatedImages.find(target => target.id === image.id)
    match.likes++
    setImage(updatedImages)
  }

  const searchedImages = images.filter(image =>
    image.title.toUpperCase().includes(search.toUpperCase())
  )


  return (
    <div className="App">
      {/* <!-- logo --> */}
      <img className="logo" src="assets/hoxtagram-logo.png" />

      <div>
        <h2>Search for images</h2>
        <input
          type='text'
          placeholder='Enter your search here'
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
      </div>


      {/* <!-- image cards --> */}
      <section className="image-container">
        {/* <!-- This is the form for challenge 1, uncomment only after you finished the main task --> */}

        <Form setImage={setImage} postImageOnServer={postImageOnServer} />

        {/* <!-- This is the Post card. Ust the following HTML as reference to build your cards using JS --> */}

        <Article searchedImages={searchedImages} setImage={setImage} updateLikesOnServer={updateLikesOnServer} createCommentOnServer={createCommentOnServer} deleteComment={deleteComment} />


      </section>

    </div>
  )
}

export default App
