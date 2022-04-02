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

const Service = () => {

  const dispatch = useDispatch();
  const [launchPayPal, setLaunchPayPal ] = React.useState(false);


  const isOpen = useSelector(state => state.app.homeDialog.isOpen)
  const service = useSelector(state => state.app.homeDialog.service)

  return (
      <Dialog fullWidth maxWidth='md' open={isOpen} onClose={()=>dispatch(openModel({ homeDialog:{isOpen:false,service:null} }))}>
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
          {launchPayPal?<Payment service={service} />:<div/>}
          </Container> 
          <h3>Reviews</h3>
        </div>
       </div>
    </Dialog>
    
  );
};

export default Service;
