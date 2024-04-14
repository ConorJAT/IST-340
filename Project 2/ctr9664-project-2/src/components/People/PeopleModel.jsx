// Import React tools.
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Use custom style for the modal.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PeopleModal = ({person}) => {
  // Use states.
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Return data presented in Modal.
  return (
    <div>
      <Button onClick={handleOpen}>{person.name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            {person.name}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.tagline ? person.tagline : '')}
          </Typography>
          <br/>
          <Typography variant="h6" component="h2">
            {(person.title ? `Title: ${person.title}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.interestArea ? `Interests: ${person.interestArea}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.office ? `Office: ${person.office}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.phone ? `Phone: ${person.phone}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.email ? `Email: ${person.email}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.website ? `Website: ${person.website}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.twitter ? `Twitter: ${person.twitter}` : '')}
          </Typography>
          <Typography variant="h6" component="h2">
            {(person.facebook ? `Facebook: ${person.facebook}` : '')}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PeopleModal;