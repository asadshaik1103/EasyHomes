import { Box, fontWeight } from "@mui/system";
import { useEffect, useState } from "react";
import "bootstrap";
import { Button, Carousel, CarouselItem } from "react-bootstrap";
import React from "react";
import {
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search, Home, Favorite, Add, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
import { GET_SERVICE } from "../contants/Api";

const Service = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [service, setService] = useState([]);

  const [option, setOption] = React.useState("details");

  useEffect (() => {
    axios
      .get(GET_SERVICE)
      .then((res) => {setService(res.data)})
      .catch();
    },[]);

  const handleChange = (event, newOption) => {
    setOption(newOption);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "2.5%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "60%",
            height: "70%",
          }}
        >
          <Carousel slide={false}>
            {service[1]?.images.map((image, index) => {
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
            backgroundColor: "grey",
            width: "35%",
            borderRadius: "5%",
            padding: "2.5%",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>NAME OF THE FOOD</h2>
          <h4> $PRICE</h4>
          <Rating name="simple-controlled" value={1} />
          <h5>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h5>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Add
              style={{ backgroundColor: "red", borderRadius: "50%" }}
              fontSize="large"
            />
            <div
              style={{
                backgroundColor: "purple",
                width: "25%",
                textAlign: "center",
                borderRadius: "20%",
              }}
            >
              <h4>3</h4>
            </div>
            <Remove
              style={{ backgroundColor: "red", borderRadius: "50%" }}
              fontSize="large"
            />
          </div>
          <Button
            style={{
              backgroundColor: "red",
              marginTop: "7.5%",
              marginInline: "30%",
            }}
            variant="text"
          >
            ADD TO CART
          </Button>
        </div>
      </div>
      <div style={{
          marginTop:'2.5%',
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>
      <ToggleButtonGroup
        color="primary"
        value={option}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="details">Details</ToggleButton>
        <ToggleButton value="reviews">Reviews</ToggleButton>
      </ToggleButtonGroup>
    </div>
    </div>
  );
};

export default Service;
