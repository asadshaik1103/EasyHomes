import SearchBar from "../Components/SearchBar";
import { HomeIcon, PlusIcon } from "../Components/Icons";
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
} from "@mui/material";
import "../Styles/HomePageStyle.css";

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [toggle, setToggle] = useState("service");

  useEffect(() => {
    axios
      .get("http://localhost:8080/service/services")
      .then((res) => setServices(res.data))
      .catch();
    console.log(services);
  },[]);

  const setToggleView = (event, newToggle) => {
    setToggle(newToggle);
  };

  const RenderService = ({ service }) => {
    console.log(services);
    console.log(service.city);
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
              onChange={(event, newValue) => {}}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <HomeIcon />
        <SearchBar />
        <div>
          <Fab variant="extended">
            <PlusIcon sx={{ mr: 1 }} />
            Property
          </Fab>
          <Fab variant="extended">
            <PlusIcon sx={{ mr: 1 }} />
            Service
          </Fab>
        </div>
      </div>

      <div style={{ marginBottom: "1%" }}>
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
        {services.map((service, index) => {
          return <RenderService service={service} />;
        })}
      </Grid>
    </div>
  );
};
export default HomePage;

const style = {
  ServiceFeed: {
    backgroundColor: "#cfcdcb",
    borderRadius: 25,
  },
};
