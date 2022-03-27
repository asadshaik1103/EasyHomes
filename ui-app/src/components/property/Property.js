import "bootstrap";
import { Button, Carousel } from "react-bootstrap";
import React from "react";
import {
  Dialog,
  Rating,
} from "@mui/material";
import { useDispatch,useSelector } from 'react-redux';
import {openModelProperty} from '../../reducers/app/appSlice';

const Property = () => {

  const dispatch = useDispatch();

  const isOpen = useSelector(state => state.app.homeDialogProperty.isOpen)
  const property = useSelector(state => state.app.homeDialogProperty.property)

    console.log(property)

  return (
      <Dialog fullWidth maxWidth='md' open={isOpen} onClose={()=>dispatch(openModelProperty({ homeDialogProperty:
            {isOpen:false,property:null} }))}>
    <div
    style={{
      padding: "5%",
        alignSelf:'center'
    }}>
        <div style={{alignSelf:'center',width:'100%'}}>
          <Carousel style={{border:5,borderColor:'red'}} slide={false}>
            {property?.images.map((image, index) => {
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
          <h2 style={{ fontWeight: "bold" }}>{property?.service_name}</h2>
          <h4> {'$'+property?.rent}</h4>
          <Rating name="simple-controlled" value={1} />
          </div>
          <Button >
            Schedule Meeting
          </Button>
          <h3>Reviews</h3>
        </div>
    </Dialog>

  );
};

export default Property;
