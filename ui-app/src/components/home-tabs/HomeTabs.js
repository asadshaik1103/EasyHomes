import React,{useState,useEffect} from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { customTheme } from '../../utils/theme';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Rating, Stack } from '@mui/material';
import { GET_PROPERTY, GET_SERVICE } from '../../contants/Api';
import Service from '../service/Service';
import { openModel,openModelProperty } from '../../reducers/app/appSlice';
import {AddFavorite} from '../Icons'
import Property from "../property/Property";

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

const RenderProperty = ({ property },index) => {
  const dispatch = useDispatch();
  const blobData= property.images[0]?.image_data ;

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
      subheader= "7th March 2022"    />
    <CardMedia
      component="img"
      height="194"
      image={`data:image/jpeg;base64,${blobData}`}
    />
          <CardActions disableSpacing style={{justifyContent:'space-between'}}>
          <IconButton aria-label="add to favorites">
        <AddFavorite />
      </IconButton>
              <Rating
                  name="simple-controlled"
                  value={1}
              />
            </CardActions>
            <CardContent style={{paddingTop:'1%'}}>
              <div style={{justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
                <Typography fontSize={24}  fontWeight='bold'>{property.property_name}</Typography>
                <Typography fontSize={24}  fontWeight='bold'>${property.rent}</Typography>
              </div>
              <Typography >{"Amenities: "+property.amenities}</Typography>
              <Typography >{"Bathrooms: "+property.bathrooms}</Typography>
              <Typography >{"Bedrooms: "+property.bedrooms}</Typography>
              <Typography >Parking: {property.parking_included?"Available":"Not available"}</Typography>

              <Typography marginTop={2.5} fontSize={16}>{property.address.location + " ,"+ property.address.postal_code}</Typography>

              <Typography fontSize={16}>{property.address.city + ",  "
                  + property.address.province + ", " +  property.address.country} </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={()=>dispatch(openModelProperty({ homeDialogProperty:{isOpen:true,property:property}}))}
                      size="small">Learn More</Button>
            </CardActions>
          </Card>
    </Grid>
      </>
  );
};


const RenderService = ({ service },index) => {
  const dispatch = useDispatch();
  const blobData= service.images[0]?.image_data ;
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
          subheader= "7th March 2022"
        />
        <CardMedia
          component="img"
          height="194"
          image={`data:image/jpeg;base64,${blobData}`}
        />
        <CardActions disableSpacing style={{justifyContent:'space-between'}}>
        <IconButton aria-label="add to favorites">
          <AddFavorite />
          </IconButton>
          <Rating
            name="simple-controlled"
            value={1}
          />
      </CardActions>
        <CardContent style={{paddingTop:'1%'}}>
        <div style={{justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
        <Typography fontSize={24}  fontWeight='bold'>{service.service_name}</Typography>
        <Typography fontSize={24}  fontWeight='bold'>${service.cost}</Typography>
        </div>
          <Typography >{service.description>100?
            service.description.substring(0,100)+'...'
            :service.description}</Typography>

        <Typography fontSize={16}  fontWeight='bold'>Subscription</Typography>
          <Stack direction="row" spacing={1}><Chip size="small" label="Weekly"/>
          <Chip size="small" label="Monthly"/>
          <Chip size="small" label="Yearly"/></Stack>

          <Typography marginTop={2.5} fontSize={16}>{service.address + " ,"+ service.pincode}</Typography>
          
          <Typography fontSize={16}>{service.city + ",  " 
          + service.province + ", " +  service.country} </Typography>
        </CardContent>
        <CardActions>
        <Button onClick={()=>dispatch(openModel({ homeDialog:{isOpen:true,service:service}}))} size="small">Learn More</Button>
      </CardActions>
      </Card>
    </Grid>
    </>
  );
};

export default function HomeTabs() {
  const [value, setValue] = React.useState(0);
  const [services, setServices] = useState([]);
  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    axios
      .get(GET_SERVICE)
      .then((res) => setServices(res.data))
      .catch();
    
    axios
      .get(GET_PROPERTY)
      .then((res) => setProperties(res.data))
      .catch();

    },[]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        style={{ padding: "2%" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {properties.map((property, index) => {
          return <RenderProperty property={property} index={index}/>;
          })}
      </Grid>       

        </TabPanel>
        <TabPanel value={value} index={1}>
      <Grid
        style={{ padding: "2%" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {services.map((service, index) => {
          return <RenderService service={service} />;
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