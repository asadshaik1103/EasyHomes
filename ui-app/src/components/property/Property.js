import React from "react";
import Dialog from '@mui/material/Dialog';
import { Button, Typography } from "@mui/material";
import Carousel,{CarouselItem} from "../carosel/Carousel";

const Property = (props) => {
    const { open, setDialogOpenState,property } = props;

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
        alignSelf:'center'
    }}>
        <div style={{alignSelf:'center',width:'100%'}}>
       <Carousel>
      {property?.images.map((item)=>{
            const blobData = item.image_data
            const imageSrc = blobData ? `data:image/jpeg;base64,${blobData}` : ''
          return(
            <CarouselItem>
            <img
            style={{maxWidth:'100%',maxHeight:'700px',width:'100%',height:'700px',}}
            src={imageSrc}
          /></CarouselItem>)
          })
        }
        </Carousel>
        </div>
          <Typography fontSize={34} style={{ fontWeight: "bold" }}>{property?.property_name}</Typography>
          <Typography fontSize={28}> {'$'+property?.rent}</Typography>
          <Button style={{marginTop:'1.5%',marginBottom:'1.5%'}} variant="contained">
            Schedule Meeting
          </Button>
          <Typography fontSize={28}>Reviews</Typography>
        </div>
    </Dialog>);
 }

export default Property;
