import "bootstrap";
import { Button, Carousel } from "react-bootstrap";
import React from "react";
import {
  Dialog,
  Rating,
} from "@mui/material";
import { useDispatch,useSelector } from 'react-redux';
import { openModel } from '../../reducers/app/appSlice';
import { Container } from "react-bootstrap";
import Payment from "../payment/payment";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { deepCompareObjects } from "../../utils/common-utils";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Service = () => {

  const dispatch = useDispatch();
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


  const isOpen = useSelector(state => state.app.homeDialog.isOpen)
  const service = useSelector(state => state.app.homeDialog.service)

  return (
      <Dialog fullWidth maxWidth='md' open={isOpen} onClose={() => handleDialogClose() }>
    <div
    style={{
      padding: "5%",
    }}>
        <div style={{alignSelf:'center',width:'100%'}}>
          <Carousel style={{border:5,borderColor:'red'}} slide={false}>
            {service?.images.map((image, index) => {
                const blobData = image.image_data
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ borderRadius: "5%",maxWidth:'100%',maxHeight:'400px',width:'100%',height:'500px',}}
                    src={`data:image/jpeg;base64,${blobData}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
        <div
          style={{
           marginTop:'10%'
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>{service?.service_name}</h2>
          <h4> {'$'+service?.cost}</h4>
          <Rating name="simple-controlled" value={1} />
          <h5>{service?.description}</h5>
          <div style={
            {
              display:"flex",
              width:"100%",
              justifyContent: "space-between"
            }
          }>
          <Button >
            Schedule Meeting
          </Button>
          <Button onClick ={() => {setLaunchPayPal(true)}} >
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
        </div>
       </div>
       <Snackbar open={succeeded} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          Payment Sucessful!
        </Alert>
          </Snackbar>
    </Dialog>
    
  );
};

export default Service;
