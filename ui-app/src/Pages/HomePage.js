import SearchBar from "../Components/SearchBar";
import { HomeIcon, PlusIcon,AddFavorite } from "../Components/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Fab,
  Avatar,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardHeader,
  CardContent,
  Grid,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import "../Styles/HomePageStyle.css";
import { Share } from "@mui/icons-material";

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [properties, setProperties] = useState([]);
  const [toggle, setToggle] = useState("service");

  useEffect(() => {
    axios
      .get("http://localhost:8080/service/services")
      .then((res) => setServices(res.data))
      .catch();
    
    axios
      .get("http://localhost:8080/property/properties")
      .then((res) => setProperties(res.data))
      .catch();

    },[]);

  const setToggleView = (event, newToggle) => {
    setToggle(newToggle);
  };

  const RenderService = ({ service },index) => {
    return (
      <Grid item xs={4}>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>
            }
            title="John Dona"
          />
          <CardContent>
            <div>
              <p>{service.serviceName}</p>
            </div>
            <div>
              <p>{service.city}</p>
            </div>
            <div>
              <p>{service.country}</p>
            </div>
            <div>
              <p>{service.pincode}</p>
            </div>
            <div>
              <p>{service.province}</p>
            </div>
            <div>
              <p>{service.address}</p>
            </div>
            <Rating
              name="simple-controlled"
              value={1}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const RenderProperty = ({ property },index) => {

    console.log(services)

    const blobData= property.images[0]?.image_data ;

    return (
      <Grid item xs={4}>
       <Card style={style.ServiceFeed} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        title={property.property_name}
        subheader= "POSETD DATE WILL BE HERE"
      />
      <CardMedia
        component="img"
        height="194"
        image={`data:image/jpeg;base64,${blobData}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <AddFavorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
      </Grid>
    );
  };

  return (
    <div>
      <div style={{ 
        display: "flex",
          justifyContent: "center",
          alignItems: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={toggle}
          exclusive
          onChange={setToggleView}
        >
          <ToggleButton value="service" aria-label="service">
            <p style={{ fontWeight: "bold" }}>Service</p>
          </ToggleButton>
          <ToggleButton value="property" aria-label="property">
            <p style={{ fontWeight: "bold" }}>Property</p>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Grid
        style={{ padding: "2%" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {toggle == "service" ? 
        services.map((service, index) => {
          return <RenderService service={service} />;
        })
        :
        properties.map((property, index) => {
          return <RenderProperty property={property} index={index}/>;
        })
        }

      </Grid>
    </div>
  );
};
export default HomePage;

const style = {
  ServiceFeed: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
  },
};
