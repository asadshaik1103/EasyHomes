import React, { useState, useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { customTheme } from '../../utils/theme';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Rating, Stack } from '@mui/material';
import { GET_PROPERTY, GET_SERVICE } from '../../constants/Api';
import Service from '../service/Service';
import { openModel, openModelProperty, setCurrentTab } from '../../reducers/app/appSlice';
import { getProperties, getServices } from '../../reducers/app/thunks/appThunk';
import { AddFavorite } from '../Icons'
import Property from "../property/Property";

import Skeleton from '@mui/material/Skeleton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${(index + 1)}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const RenderProperty = ({ property }, index) => {
  const dispatch = useDispatch();
  const blobData = property.images[0]?.image_data;

  return (
    <>
      <Property />
      <Grid item xs={4}>
        <Card style={style.ServiceFeed} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>
            }
            title="John Dona"
            subheader="7th March 2022" />
          <CardMedia
            component="img"
            height="194"
            image={`data:image/jpeg;base64,${blobData}`}
          />
          <CardActions disableSpacing style={{ justifyContent: 'space-between' }}>
            <IconButton aria-label="add to favorites">
              <AddFavorite />
            </IconButton>
            <Rating
              name="simple-controlled"
              value={1}
            />
          </CardActions>
          <CardContent style={{ paddingTop: '1%' }}>
            <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
              <Typography fontSize={24} fontWeight='bold'>{property.property_name}</Typography>
              <Typography fontSize={24} fontWeight='bold'>${property.rent}</Typography>
            </div>
            <Typography >{"Amenities: " + property.amenities}</Typography>
            <Typography >{"Bathrooms: " + property.bathrooms}</Typography>
            <Typography >{"Bedrooms: " + property.bedrooms}</Typography>
            <Typography >Parking: {property.parking_included ? "Available" : "Not available"}</Typography>

            <Typography marginTop={2.5} fontSize={16}>{property.address.location + " ," + property.address.postal_code}</Typography>

            <Typography fontSize={16}>{property.address.city + ",  "
              + property.address.province + ", " + property.address.country} </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => dispatch(openModelProperty({ homeDialogProperty: { isOpen: true, property: property } }))}
              size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};


const RenderService = ({ service }, index) => {
  const dispatch = useDispatch();
  const blobData = service.images[0]?.image_data;
  return (
    <>
      <Service />
      <Grid item xs={4}>
        <Card style={style.ServiceFeed} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>
            }
            title="John Dona"
            subheader="7th March 2022"
          />
          <CardMedia
            component="img"
            height="194"
            image={`data:image/jpeg;base64,${blobData}`}
          />
          <CardActions disableSpacing style={{ justifyContent: 'space-between' }}>
            <IconButton aria-label="add to favorites">
              <AddFavorite />
            </IconButton>
            <Rating
              name="simple-controlled"
              value={1}
            />
          </CardActions>
          <CardContent style={{ paddingTop: '1%' }}>
            <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
              <Typography fontSize={24} fontWeight='bold'>{service.service_name}</Typography>
              <Typography fontSize={24} fontWeight='bold'>${service.cost}</Typography>
            </div>
            <Typography >{service.description > 100 ?
              service.description.substring(0, 100) + '...'
              : service.description}</Typography>

            <Typography fontSize={16} fontWeight='bold'>Subscription</Typography>
            <Stack direction="row" spacing={1}><Chip size="small" label="Weekly" />
              <Chip size="small" label="Monthly" />
              <Chip size="small" label="Yearly" /></Stack>

            <Typography marginTop={2.5} fontSize={16}>{service.address + " ," + service.pincode}</Typography>

            <Typography fontSize={16}>{service.city + ",  "
              + service.province + ", " + service.country} </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => dispatch(openModel({ homeDialog: { isOpen: true, service: service } }))} size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export function deepCompareObjects(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
      typeof obj1 !== 'object' ||
      typeof obj2 !== 'object' ||
      obj1 == null ||
      obj2 == null
  ) {
      return false;
  }

  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);

  if (keysA.length !== keysB.length) {
      return false;
  }

  let result = true;

  keysA.forEach((key) => {
      if (!keysB.includes(key)) {
          result = false;
      }

      if (
          typeof obj1[key] === 'function' ||
          typeof obj2[key] === 'function'
      ) {
          if (obj1[key].toString() !== obj2[key].toString()) {
              result = false;
          }
      }

      if (!deepCompareObjects(obj1[key], obj2[key])) {
          result = false;
      }
  });

  return result;
}

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);
  const [services, setServices] = useState([]);
  const [properties, setProperties] = useState([]);
  const dispatch = useDispatch();

  const propertiesFromStore = useSelector((state) => state.app.properties);
  // if (propertiesFromStore.length > 0) {
    if (propertiesFromStore.length !== properties.length 
      && !deepCompareObjects(propertiesFromStore, properties)) {
      setProperties(propertiesFromStore);
    }
  // }

  const servicesFromStore = useSelector((state) => state.app.services);
  // if (servicesFromStore.length > 0) {
    if (servicesFromStore.length !== services.length
      && !deepCompareObjects(servicesFromStore, services)) {
      setServices(servicesFromStore);
    }
  // }

  const homePagePropertiesLoading = useSelector((state) => state.app.homePagePropertiesLoading);
  const homePageServicesLoading = useSelector((state) => state.app.homePageServicesLoading);

  useEffect(() => {

    dispatch(getProperties());
    dispatch(getServices());

  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setCurrentTab({currentTab: newValue}));
  };
  const tabTheme = customTheme;

  const getHomeTabsBoxStyles = () => {
    return {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    };
  };

  return (
    <div className="home-tabs-container">
      <ThemeProvider theme={tabTheme}>
        <Box sx={getHomeTabsBoxStyles()}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons
            allowScrollButtonsMobile
            indicatorColor="secondary"
            aria-label="Home Tabs"
          >
            <Tab label="Properties" />
            <Tab label="Services" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid
            style={{ padding: "2%", height: "95vh", overflow: "auto" }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          >
            {!homePagePropertiesLoading ? 
              properties.length > 0 ? 
                properties.map((property, index) => {
                  return <RenderProperty property={property} index={index} />;
                }) : 
                <Typography variant="h5" align="center">No Properties Available</Typography> 
              :
              Array(3).fill(1).map((_, index) => {
                return <Skeleton variant="rect" sx={{ marginLeft: '10px' }} width={250} height={340} />;
              })
            }
            
          </Grid>

        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            style={{ padding: "2%", height: "95vh", overflow: "auto" }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          >
            {!homePageServicesLoading ?
              services.length > 0 ? 
                services.map((service, index) => {
                  return <RenderService service={service} />;
                }) :
                <Typography variant="h5" align="center">No Services Available</Typography>
              :
              Array(3).fill(1).map((_, index) => {
                return <Skeleton variant="rect" sx={{ marginLeft: '10px' }} width={250} height={340} />;
              })
            }
          </Grid>
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}

const style = {
  ServiceFeed: {
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
  },
};