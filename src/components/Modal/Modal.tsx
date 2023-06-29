import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FiPlayCircle } from 'react-icons/fi';

import './Modal.css';

type TrailerModalProps = {
  trailerKey: string;
};

function TrailerModal({ trailerKey }: TrailerModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="container-modal">
      <button onClick={handleOpen} aria-label="Botão de reproduzir o trailer">
        <FiPlayCircle />
        Ver trailer
      </button>
      <Modal
        className="Modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="Exibe o trailer do filme"
        aria-describedby="Um modal para vizualizar o trailer do filme ou série"
      >
        <Box className="box">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            allowFullScreen={true}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default TrailerModal;
