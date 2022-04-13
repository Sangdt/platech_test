import ContactForm from 'components/SharedComponents/ContactForm'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';



const ContactFormModal = ({ openModal = false, handleModalClose, modalTitle, productName }) => {
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (<Dialog
        // fullScreen
        fullWidth
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">
            {modalTitle}
        </DialogTitle>
        <DialogContent>
            <ContactForm productName={productName} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleModalClose} color='warning' variant="contained">
                Tắt Cửa Sổ Này
            </Button>
        </DialogActions>
    </Dialog>);
}

export {
    ContactFormModal
}