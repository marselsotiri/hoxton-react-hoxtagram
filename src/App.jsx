import { useEffect, useState } from 'react'


import './App.css'
import Article from './Article/Article';

import Form from './Form/Form';

function App() {
  const [images, setImage] = useState([])
  useEffect(function () {
    fetch("http://localhost:8000/images")
      .then((response) => response.json())
      .then((image) => setImage(image));
  }, []);

  function postImageOnServer(title, src) {
    return fetch("http://localhost:8000/images", {
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

  function createCommentOnServer(content, ImageId) {


    return fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: content,
        ImageId: ImageId
      })
    }).then((response) => response.json())
      .then((commment) => {
        const updatedImages = JSON.parse(JSON.stringify(images))
        const match = updatedImages.find(target => target.id === ImageId)
        match.comments.push(commment)
        setImage(updatedImages)
      })
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

  return (
    <div className="App">
      {/* <!-- logo --> */}
      <img className="logo" src="assets/hoxtagram-logo.png" />

      {/* <!-- image cards --> */}
      <section className="image-container">
        {/* <!-- This is the form for challenge 1, uncomment only after you finished the main task --> */}

        <Form setImage={setImage} postImageOnServer={postImageOnServer} />

        {/* <!-- This is the Post card. Ust the following HTML as reference to build your cards using JS --> */}

        <Article images={images} setImage={setImage} updateLikesOnServer={updateLikesOnServer} createCommentOnServer={createCommentOnServer} />


      </section>

    </div>
  )
}

export default App
