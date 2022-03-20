import { Box, fontWeight } from "@mui/system";
import { useEffect, useState } from "react";
import "bootstrap";
import { Button, Carousel, CarouselItem } from "react-bootstrap";
import React from "react";
import {
  Dialog,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search, Home, Favorite, Add, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
import { GET_SERVICE } from "../../contants/Api";
import { useDispatch,useSelector } from 'react-redux';
import { openModel } from '../../reducers/app/appSlice';

const Service = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();

  const isOpen = useSelector(state => state.app.homeDialog.isOpen)
  const service = useSelector(state => state.app.homeDialog.service)

  return (
      <Dialog fullWidth maxWidth='md' open={isOpen} onClose={()=>dispatch(openModel({ homeDialog:{isOpen:false,service:null} }))}>
    <div
    style={{
      padding: "5%",
    }}>
        <div>
          <Carousel style={{border:5,borderColor:'red'}} slide={false}>
            {service?.images.map((image, index) => {
                const blobData = image.image_data
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ borderRadius: "5%" }}
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
          <Button >
            Schedule Meeting
          </Button>
          <h3>Reviews</h3>
        </div>
       </div>
    </Dialog>
    
  );
};

export default Service;
