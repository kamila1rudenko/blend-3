import Section from "../Section/Section";
import Container from "../Container/Container";
import { useState } from "react";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type Photo from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";

export default function App() {
  const [photos, setSelectPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setError(false);
      setPhotos([]);
      const fetchedPhotos = await getPhotos(query);
      if (!fetchedPhotos.length) {
        toast.error("There are not imgs");
        return;
      }
      setPhotos(fetchedPhotos);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <p>Oops! Something went wrong.</p>}
          <PhotosGallery photos={photos} onSelect={handleSelect} />
          {modalSrc && (
            <Modal onClose={() => setSelectedPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
