import { useEffect, useState } from 'react';

const APIKEY = import.meta.env.VITE_GIPHY_API_KEY;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized.url);
    } catch (error) {
      setGifUrl("https://media0.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=790b761175a9fa33eeedcf8021666ba760c800d9214a9379&rid=giphy.gif&ct=g")
    }
  }

  useEffect(() => {
    if (keyword) {
      fetchGifs();
    }
  }, [keyword]);

  return gifUrl;
}

export default useFetch;