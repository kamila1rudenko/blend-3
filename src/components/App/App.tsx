import Section from "../Section/Section";
import Container from "../Container/Container";
import { useState } from "react";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Photo } from "../../types/photo";
import PhotoGallery from "../PhotosGallery/PhotosGallery";
import { Modal } from "../Modal/Modal";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setPhotos([]);

      const fetchedPhotos = await getPhotos(query);
      if (!fetchedPhotos.length) {
        toast.error("There are no images found");
        return;
      }

      setPhotos(fetchedPhotos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section>
      <Container>
        <Form onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {isError && (
          <Text textAlign="center" marginBottom="60px">
            Oops! Something went wrong...
          </Text>
        )}
        <PhotoGallery
          photos={photos}
          onSelect={(photo) => setSelectedPhoto(photo)}
        />

        {selectedPhoto && (
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

        <ToastContainer />
      </Container>
    </Section>
  );
}
