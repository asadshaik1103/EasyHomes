import React from "react";
import {Button,Dialog, Typography} from "@mui/material";
import Payment from "../payment/payment";
import Carousel,{CarouselItem} from "../carosel/Carousel";

const Service = (props) => {

  const { open, setDialogOpenState,service } = props;
  const [launchPayPal, setLaunchPayPal ] = React.useState(false);

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
          {launchPayPal?<Payment service={service} />:<div/>}
          <Typography fontSize={28}>Reviews</Typography>
       </div>
    </Dialog>
    
  );
};

export default Service;
