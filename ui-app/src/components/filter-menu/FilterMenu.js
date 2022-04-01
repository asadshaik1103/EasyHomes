import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { customTheme } from '../../utils/theme';
import { IconButton } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { filterProperties, filterServices } from '../../reducers/app/thunks/appThunk';
import { useDispatch, useSelector } from 'react-redux';
// {
//   "property_name": "string",
//   "amenities": "string",
//   "property_type": "string",
//   "numberOfBedrooms": 0,
//   "numberOfBathrooms": 0,
//   "parkingIncluded": true,
//   "rent": 0,
//   "city": "string",
//   "province": "string",
//   "country": "string"
// }
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90vh',
  lineHeight: '60px',
  // width: '100%'
}));

// const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = customTheme;

export default function Filter({ setChecked, checked }) {
  // create array of objects with label, id, type and size
  const filterOptions = [
    {
      label: 'Name',
      ariaLabel: 'Name',
      id: 'property_name',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Property Type',
      ariaLabel: 'Property Type',
      id: 'property_type',
      type: 'select',
      size: 'small',
    },
    {
      label: 'Number of bedrooms',
      ariaLabel: 'Number of bedrooms',
      id: 'numberOfBedrooms',
      type: 'select',
      size: 'small',
    },
    {
      label: 'Number of bathrooms',
      ariaLabel: 'Number of bathrooms',
      id: 'numberOfBathrooms',
      type: 'select',
      size: 'small',
    },
    {
      label: 'Parking Included',
      ariaLabel: 'Parking Included',
      id: 'parkingIncluded',
      type: 'select',
      size: 'small',
    },
    {
      label: 'Rent',
      ariaLabel: 'Rent',
      id: 'rent',
      type: 'number',
      size: 'small',
    },
    {
      label: 'City',
      ariaLabel: 'City',
      id: 'city',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Province',
      ariaLabel: 'Province',
      id: 'province',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Country',
      ariaLabel: 'Country',
      id: 'country',
      type: 'text',
      size: 'small',
    }
  ];

  const servicesFilterOptions = [
    {
      label: 'Service Name',
      ariaLabel: 'Name',
      id: 'service_name',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Service Type',
      ariaLabel: 'Service Type',
      id: 'service_type',
      type: 'select',
      size: 'small',
    },
    {
      label: 'Cost',
      ariaLabel: 'Cost',
      id: 'cost',
      type: 'number',
      size: 'small',
    },
    {
      label: 'Plan',
      ariaLabel: 'Plan',
      id: 'plan',
      type: 'text',
      size: 'small',
    },
    {
      label: 'City',
      ariaLabel: 'City',
      id: 'city',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Province',
      ariaLabel: 'Province',
      id: 'province',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Country',
      ariaLabel: 'Country',
      id: 'country',
      type: 'text',
      size: 'small',
    }
  ];

  const initialFiltersState = {
    property_name: '',
    amneties: '',
    property_type: '',
    numberOfBedrooms: null,
    numberOfBathrooms: null,
    parkingIncluded: null,
    rent: null,
    city: '',
    province: '',
    country: '',
  };

  const servicesInitialFiltersState = {
    service_name: '',
    service_type: '',
    cost: null,
    plan: '',
    city: '',
    province: '',
    country: '',
  };

  const [filterParams, setFilterParams] = React.useState({
    ...initialFiltersState
  });

  const [servicesFilterParams, setServicesFilterParams] = React.useState({
    ...servicesInitialFiltersState
  });

  const dispatch = useDispatch();
  const currentTab = useSelector(state => state.app.currentTab);

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (currentTab === 0) {
      dispatch(filterProperties({
        filterParams: {
          ...filterParams,
          property_type: filterParams.property_type === 'All' ? null : filterParams.property_type,
          numberOfBedrooms: filterParams.numberOfBedrooms === 0 ? null : filterParams.numberOfBedrooms,
          numberOfBathrooms: filterParams.numberOfBathrooms === 0 ? null : filterParams.numberOfBathrooms,
          parkingIncluded: filterParams.parkingIncluded === 'Any' ? null : filterParams.parkingIncluded,
        },
        
      }));
    } else {
      dispatch(filterServices({filterParams: filterParams}));
    }

  };

  const handleArrowButtonClick = () => {
    console.log('handleArrowButtonClick');
    setChecked(!checked);
  };

  const getFilterTextFieldsProps = (filter) => {
    // return filterOptions.map(filter => {
      return {
        key: filter.id,
        id: filter.id,
        label: filter.label,
        type: filter.type,
        size: filter.size,
        value: filterParams[filter.id],
        onChange: (event) => {
          setFilterParams({
            ...getFilterParams(),
            [filter.id]: event.target.value,
          });
        },
        sx: {
          m: 2,
          width: "calc(100% - 16px)"
        },
      };
    // }
  };

  const getFilterParams = () => {
    return (currentTab === 0) ? filterParams : servicesFilterParams;
  }

  const disableSearchButton = () => {
    return Object.values(filterParams).every(x => x === null || x === '');
  };

  const getTextFields = (filterOptions) => {
    const getMenuItemKey = (id, value) => {
      return `${id}-${value}`;
    }
    return <Box sx={{ 
      p: 2,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {currentTab == 0 ? filterOptions.map((option) => {
        if (option.type == "select") {
          if (option.id == 'property_type') {
            return (
              <FormControl fullWidth sx={{ m: 2, width: '95%' }}>
                <InputLabel id="add-property-property-type">
                  Property Type
                </InputLabel>
                <Select
                labelId="add-property-property-type-label"
                id="add-property-property-type-id"
                label="Property Type"
                onChange={(event) => { 
                  setFilterParams({
                  ...filterParams,
                    [option.id]: event.target.value,
                  });
                }}
                size="small"
                >
                <MenuItem key={getMenuItemKey(option.id, 0)} value={'All'}>Any</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 1)} value={1}>1 BHK</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 2)} value={2}>2 BHK</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 3)} value={3}>3 BHK</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 4)} value={3}>4 House</MenuItem>
                </Select>
              </FormControl>
            )
          } else if (option.id == 'numberOfBedrooms') {
            return (
              <FormControl fullWidth sx={{ m: 2, width: '95%' }}>
                <InputLabel id="add-property-bedrooms">
                  Bedrooms
                </InputLabel>
                <Select
                labelId="add-property-bedrooms-label"
                id="add-property-bedrooms-id"
                label="Bedrooms"
                // value={bedrooms}
                // onChange={handleBedroomsChange}
                onChange={(event) => { 
                  setFilterParams({
                  ...filterParams,
                    [option.id]: event.target.value,
                  });
                }}
                size="small"
                >
                <MenuItem key={getMenuItemKey(option.id, 0)} value={0}>Any</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 1)} value={1}>One</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 2)} value={2}>Two</MenuItem>
                <MenuItem key={getMenuItemKey(option.id, 3)} value={3}>Three</MenuItem>
                </Select>
              </FormControl>
              )
          } else if (option.id == 'parkingIncluded') {
              return (<FormControl fullWidth sx={{ m: 2, width: '95%' }}>
                <InputLabel id="parking-included">
                  Parking Included
                </InputLabel>
                <Select
                  labelId="parking-included-label"
                  id="parking-included-id"
                  label="Parking Included"
                // value={bathrooms}
                // onChange={handleBathroomsChange}
                  onChange={(event) => { 
                    setFilterParams({
                    ...filterParams,
                      [option.id]: event.target.value,
                    });
                  }}
                  size="small"
                >
                  <MenuItem key={getMenuItemKey(option.id, 0)} value={'Any'}>Any</MenuItem>
                  <MenuItem key={getMenuItemKey(option.id, 2)} value={true}>Available</MenuItem>
                  <MenuItem key={getMenuItemKey(option.id, 1)} value={false}>Not Available</MenuItem>
                </Select>
              </FormControl>)
          } else if (option.id == 'numberOfBathrooms') {
            return (<FormControl fullWidth sx={{ m: 2, width: '95%' }}>
              <InputLabel id="add-property-bathrooms">
                Bathrooms
              </InputLabel>
              <Select
                labelId="add-property-bathrooms-label"
                id="add-property-bedrooms-id"
                label="Bathrooms"
                // value={bathrooms}
                // onChange={handleBathroomsChange}
                onChange={(event) => { 
                  setFilterParams({
                  ...filterParams,
                    [option.id]: event.target.value,
                  });
                }}
                size="small"
              >
              <MenuItem key={getMenuItemKey(option.id, 0)} value={0}>Any</MenuItem>
              <MenuItem key={getMenuItemKey(option.id, 1)} value={1}>One</MenuItem>
              <MenuItem key={getMenuItemKey(option.id, 1)} value={2}>Two</MenuItem>
              <MenuItem key={getMenuItemKey(option.id, 1)} value={3}>Three</MenuItem>
              </Select>
            </FormControl>)
        }
        } else {
          if (option.id == 'rent') {
            return (
              <FormControl fullWidth sx={{ m: 2, width: '95%' }}>
                <InputLabel htmlFor="post-property-dailog-rent">Rent</InputLabel>
                <OutlinedInput
                  id="post-property-dailog-rent"
                  // value={rent}
                  // onChange={handleRentChange}
                  onChange={(event) => { 
                    setFilterParams({
                    ...filterParams,
                      [option.id]: event.target.value,
                    });
                  }}
                  label="Rent"
                  size="small"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            )
          } else {
            return (<TextField 
              {...getFilterTextFieldsProps(option)}
            />)
          }
          
        }
        }) :
        servicesFilterOptions.map((option) => {
          return (<TextField 
            {...getFilterTextFieldsProps(option)}
          />)
        })

      }
      <Button disabled={disableSearchButton()} variant="contained" onClick={(e) => { handleSearch(e) }}>Search</Button>
    </Box>
  };
  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 0,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 2,
              }}
            >
              
              {[24].map((elevation) => (
                <Item key={elevation} elevation={elevation}>
                  
                  <Box sx={{ p: 2 }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      {checked ? <Typography color="#000" sx={{ pl: 3 }} variant="h6">
                        Advanced Filters
                      </Typography> : null}
                      <IconButton 
                        id="filter-menu-arrow-button"
                        onClick={handleArrowButtonClick}>
                        {checked ? <ArrowCircleLeftOutlinedIcon color="primary" /> : <ArrowCircleRightOutlinedIcon color="primary" />}
                      </IconButton>
                    </Box>
                    {checked ? getTextFields(filterOptions) : null}
                  </Box>
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
