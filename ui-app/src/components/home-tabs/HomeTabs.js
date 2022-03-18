import React,{useState,useEffect} from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import { customTheme } from '../../utils/theme';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, IconButton, Rating, Stack } from '@mui/material';
import { AddFavorite } from '../Icons';
import { Share } from '@mui/icons-material';
import { GET_PROPERTY, GET_SERVICE } from '../../contants/Api';

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


const RenderService = ({ services },index) => {
  const blobData= services.images[0]?.image_data ;
  return (
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
        <Typography fontSize={24}  fontWeight='bold'>{services.service_name}</Typography>
        <Typography fontSize={24}  fontWeight='bold'>${services.cost}</Typography>
        </div>
          <Typography >{services.description>100?
            services.description.substring(0,100)+'...'
            :services.description}</Typography>

        <Typography fontSize={16}  fontWeight='bold'>Subscription</Typography>
          <Stack direction="row" spacing={1}><Chip size="small" label="Weekly"/>
          <Chip size="small" label="Monthly"/>
          <Chip size="small" label="Yearly"/></Stack>

          <Typography marginTop={2.5} fontSize={16}>{services.address + " ,"+ services.pincode}</Typography>
          
          <Typography fontSize={16}>{services.city + ",  " 
          + services.province + ", " +  services.country} </Typography>
        </CardContent>

        <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      </Card>
    </Grid>
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
        {services.map((services, index) => {
          return <RenderService services={services} />;
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