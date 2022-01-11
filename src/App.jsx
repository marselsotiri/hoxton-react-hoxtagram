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
    }).then(function (resp) {
      return resp.json();
    });
  }

  function updateLikesOnServer(image) {
    return fetch(`http://localhost:8000/images/${image.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: image.likes
      })
    }).then((resp) => resp.json());
  }

  return (
    <div className="App">
      {/* <!-- logo --> */}
      <img className="logo" src="assets/hoxtagram-logo.png" />

      {/* <!-- image cards --> */}
      <section className="image-container">
        {/* <!-- This is the form for challenge 1, uncomment only after you finished the main task --> */}

        <Form />

        {/* <!-- This is the Post card. Ust the following HTML as reference to build your cards using JS --> */}

        <Article images={images} setImage={setImage} updateLikesOnServer={updateLikesOnServer}/>
        

      </section>

    </div>
  )
}

export default App
