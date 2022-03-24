export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage:
      "https://nypost.com/wp-content/uploads/sites/2/2022/01/Novak-Djokovic-French-Open-vaccine.jpg?quality=80&strip=all",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  console.log(allMemes);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    /*setMeme((prevMeme) => ({
      ...prevMeme, (neće da radi, pa mora sve ručno)
      randomImage: url,
    }));*/
    setMeme((prevMeme) => ({
      topText: prevMeme.topText,
      bottomText: prevMeme.bottomText,
      randomImage: prevMeme.randomImage,
      randomImage: url,
    }));
  }

  console.log(meme);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      topText: prevMeme.topText,
      bottomText: prevMeme.bottomText,
      randomImage: prevMeme.randomImage,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        ></input>
        <input
          className="form--input"
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        ></input>
        <button className="form-button" onClick={getMemeImage}>
          Get a new meme image ☑️
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image"></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
