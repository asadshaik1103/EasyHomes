import React, { useState, useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { customTheme } from '../../utils/theme';
import { Grid} from '@mui/material';
import { GET_PROPERTY, GET_SERVICE } from '../../constants/Api';
import { setCurrentTab } from '../../reducers/app/appSlice';
import { getProperties, getServices } from '../../reducers/app/thunks/appThunk';
import {RenderMyProperty} from '../property/RenderMyProperty'
import {RenderProperty} from '../property/RenderProperty'
import { RenderService } from '../service/RenderService';
import { RenderMyService } from '../service/RenderMyService';

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
  const userId = localStorage.getItem("userId")
  const [isDeleted,setDeleted] = React.useState(false);
  const [isServiceDeleted,setServiceDeleted] = React.useState(false);
  const [isUpdated,setUpdated] = React.useState(false);
  const [isServiceUpdated,setServiceUpdated] = React.useState(false);

  const handleDeleted = () => {
    setDeleted(!isDeleted);
  }

  const handleServiceDeleted = () => {
    setServiceDeleted(!isServiceDeleted);
  }

  const handleUpdate = () => {
    setUpdated(!isUpdated);
  }

  const handleServiceUpdate = () => {
    setServiceUpdated(!isServiceUpdated);
  }
  
  useEffect(() => {
    axios
      .get(GET_SERVICE)
      .then((res) => setServices(res.data))
      .catch();
    
    axios
      .get(GET_PROPERTY)
      .then((res) => setProperties(res.data))
      .catch();
    },[isDeleted,isUpdated,isServiceDeleted,isServiceUpdated]);

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
            <Tab label="Feeds" />
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
        <TabPanel value={value} index={2}>
      <Grid
        style={{ padding: "2%" }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      >
        {properties.map((property,index)=> {
          if(property.user_id == userId){
            return <RenderMyProperty  handleDeleted={handleDeleted} handleUpdate={handleUpdate} property={property} index={index}/>
          }else return <></>
        })}
        {services.map((service,index)=> {
          if(service.user_id == userId){
            return <RenderMyService  handleServiceDeleted={handleServiceDeleted} 
            handleServiceUpdate={handleServiceUpdate} service={service} index={index}/>
          }else return <></>
        })}
      </Grid>
        </TabPanel>
      </ThemeProvider>
    </div>
  );
}