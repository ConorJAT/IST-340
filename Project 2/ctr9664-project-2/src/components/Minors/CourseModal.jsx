// Import React tools.
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Import utils.
import { getData } from '../../utils/getData';

// Set style for class modal.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CourseModal = ({course}) => {
  // Use modal states.
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use loading states.
  const [loaded, setLoaded] = React.useState(false);
  const [dataObj, setDataObj] = React.useState();

  // Go get data.
  React.useEffect( () => {
      // Page was rendered; time to get data.
      getData(`course/courseID=${course}/`).then( (json) => {
          setDataObj(json);
          setLoaded(true);
      });
  }, [] );

  // Return for data not loaded yet.
  if (!loaded) {
    return (
      <div>
      <Button onClick={handleOpen}>{course}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            Class Information Not Availible.
          </Typography>
        </Box>
      </Modal>
    </div>
    );
  }

  // Return for data that is already loaded.
  return (
    <div>
      <Button onClick={handleOpen}>{course}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            {dataObj.title}
          </Typography>
          <Typography variant="h6" component="h2">
            {dataObj.courseID}
            <br/><br/>
            {dataObj.description}
          </Typography> 
        </Box>
      </Modal>
    </div>
  );
};

export default CourseModal;