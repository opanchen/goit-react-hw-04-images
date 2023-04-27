import { useState } from "react";
import css from "./ImageGalleryItem.module.css";
import { Modal } from "components";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ alt, largeImageURL, webformatURL }) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen((prevModalState) => !prevModalState)
    }

    return (
        <li 
        className={css['galery-item']}>
        <img className={css['galery-image']} src={webformatURL} alt={alt} onClick={toggleModal}
        />
        {isModalOpen && 
                    <Modal
                    alt={alt}
                    largeImageURL={largeImageURL}
                    onClose={toggleModal}
                    />
        }
        </li> 
    )
}

ImageGalleryItem.propTypes = {
    alt: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired, 
}