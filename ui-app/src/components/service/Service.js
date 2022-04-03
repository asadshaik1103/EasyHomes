import React from "react";
import {Button,Dialog, Typography} from "@mui/material";
import Payment from "../payment/payment";
import Carousel,{CarouselItem} from "../carosel/Carousel";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Service = (props) => {

  const { open, setDialogOpenState,service } = props;
  const [launchPayPal, setLaunchPayPal ] = React.useState(false);
  const [succeeded, setSucceeded] = React.useState(false);
  const [toastContent, setToastContent] = React.useState('');

  const handleSnackClose = () => {
    setSucceeded(false);
  }

  const handleDialogClose = () => {
    setLaunchPayPal(false);
    dispatch(openModel({ homeDialog:{isOpen:false,service:null} }))
  }

  const handleClose = () => {
    setDialogOpenState();
   };

   const handleDialogClose = () => {
     setDialogOpenState();
   }  

  return (
    <Dialog fullWidth maxWidth='md' onBackdropClick={handleDialogClose} onClose={handleClose} open={open}>
    <div
    style={{
      padding: "5%",
    }}>
        <div style={{alignSelf:'center',width:'100%'}}>
        <Carousel>
      { service?.images.map((item , index)=>{
            const blobData = item.image_data
            const imageSrc = blobData ? `data:image/jpeg;base64,${blobData}` : ''
          return(
            <CarouselItem>
            <img style={{maxWidth:'100%',maxHeight:'700px',width:'100%',height:'700px',}}
            src={imageSrc}/>
            </CarouselItem>)
          })
        }
        </Carousel>
        </div>
          <Typography fontSize={34} style={{ fontWeight: "bold" }}>{service?.service_name}</Typography>
          <Typography fontSize={28}> {'$'+service?.cost}</Typography>
            <Typography>{service?.description}</Typography>
          <div style={
            {
              display:"flex",
              width:"100%",
              justifyContent: "space-between",
              marginTop:'1.5%',
              marginBottom:'1.5%  '
            }
          }>
          <Button variant="contained">
            Schedule Meeting
          </Button>
          <Button variant="contained" onClick ={() => {setLaunchPayPal(true)}} >
            Buy Service
          </Button>
          </div>
          <Container style={
            {
              marginTop:"1%",
              display:"flex",
              justifyContent: "center"
            }
          }>
          {launchPayPal?<Payment service={service} setToastMessage={setSucceeded} />:<div/>}
          </Container> 
          <h3>Reviews</h3>
       <Snackbar open={succeeded} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Payment Sucessful!
        </Alert>
          </Snackbar>
          </div>
    </Dialog>
    
  );
};

export default Service;
