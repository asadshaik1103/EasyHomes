import React from "react";
import {Button, Rating, Dialog, Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { openModel } from '../../reducers/app/appSlice';
import Payment from "../payment/payment";
import Carousel,{CarouselItem} from "../carosel/Carousel";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ServiceReviewForm from "./ServiceReviewForm";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Service = (props) => {

  const { open, setDialogOpenState,service } = props;
  const [launchPayPal, setLaunchPayPal ] = React.useState(false);
  const [succeeded, setSucceeded] = React.useState(false);
  const [toastContent, setToastContent] = React.useState('');
  const [openReview,setOpenReview] = React.useState(false);

  const dispatch = useDispatch();
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
        {launchPayPal?<Payment service={service} setToastMessage={setSucceeded} />:<div/>}
        <Snackbar open={succeeded} autoHideDuration={6000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Payment Sucessful!
          </Alert>
        </Snackbar>
        <h3 style={{ fontWeight: "bold" }}>Reviews</h3>
        {service?.reviews.map((review, index) => {
            return (
              <div><Container style={
                {
                  marginTop:"2%",
                  marginLeft:-10
                  
                }
              }>
                <div style={{justifyContent:'space-between',display:"flex"}}>
                  <Typography fontSize={25} style={{ padding:0, margin:0 }}>{review.review_subject}</Typography>
                  <Rating readOnly name="simple-controlled" value={review.review_rating} />
                </div>
                <p style={{ padding:0, margin:0}}>{review.review_description}</p>
                <small style={{ padding:0, margin:0}}>Posted on:{review.posted_on}</small>
                <hr></hr>
                </Container>
              </div>
            );
          })}
      <ServiceReviewForm style = {{marginLeft:-30}} service = {service}/>
       </div>

    </Dialog>
    
  )
}

export default Service;
