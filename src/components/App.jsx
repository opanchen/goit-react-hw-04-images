import { useState, useEffect } from "react";
import { fetchImages } from "services";
import { Searchbar, ImageGallery, Loader, Button } from "components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "./App.module.css"

export const App = () => {

const [images, setImages] = useState([]);
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState(null)

useEffect(() => {
  if (!query) return;
  
  const handleGalleryLoading = async () => {
    try {
      setLoading(true);

      const data = await fetchImages(query, page);

      if (page === 1) {
        data.totalHits === 0 ? 
        toast.error('Sorry, there are no images matching your search query. Please try again.') :
        toast.success(`Hooray! We found ${data.totalHits} images.`);
      }

      setImages((prevImages) => [...prevImages, ...data.hits]);
      setTotal(data.totalHits);

    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  } 

  handleGalleryLoading();

}, [query, page])

const handleFormSubmit = (searchQuery) => {

  if (searchQuery === query) {
    toast.warning("You're trying to enter the same search query twice.")
    return
  }
  
  setImages([]);
  setPage(1);
  setQuery(searchQuery);
}

const handleLoadMore = () => {
  setPage((prevPage) => prevPage + 1)
}

if (total / images.length <= 1) {
  toast.warning("We're sorry, but you've reached the end of search results.");
}

return( 
  <div className={css.app}>
    <Searchbar
      onFormSubmit={handleFormSubmit}
    />

    {error && <p>Looks like something went wrong. Please, try again!</p> }

    {images.length > 0 && <ImageGallery
      items={images}
    />}

    {isLoading && <Loader/> }

    {(images.length > 0  && total/images.length > 1 && !isLoading) &&  
    <Button
      onLoadMoreClick={handleLoadMore}
      isLoading={isLoading}
    />}

    <ToastContainer 
    autoClose={3000}
    />    
  </div>
  )
}