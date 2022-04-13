import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const SearchResultModal = ({ openModal = false, handleModalClose, modalTitle, children }) => {
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (<Dialog
        // fullScreen
        scroll='body'

        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">
            {modalTitle}
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleModalClose} color='warning' variant="contained">
                Tắt Cửa Sổ Này
            </Button>
        </DialogActions>
    </Dialog>);
}

export {
    SearchResultModal
}