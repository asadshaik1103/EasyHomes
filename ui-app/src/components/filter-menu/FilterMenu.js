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
      id: 'filter-menu-name',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Number of bedrooms',
      ariaLabel: 'Number of bedrooms',
      id: 'filter-menu-bedrooms',
      type: 'number',
      size: 'small',
    },
    {
      label: 'City',
      ariaLabel: 'City',
      id: 'filter-menu-city',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Province',
      ariaLabel: 'Province',
      id: 'filter-menu-province',
      type: 'text',
      size: 'small',
    },
    {
      label: 'Country',
      ariaLabel: 'Country',
      id: 'filter-menu-country',
      type: 'text',
      size: 'small',
    }
    
  ];

  const [filterParams, setFilterParams] = React.useState({
    name: '',
    bedrooms: '',
    city: '',
    province: '',
    country: '',
  });

  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    console.log('searching: ', event);
    setChecked(!checked);
    // call filter properties API with request body
    axios.post('http://localhost:8080/properties/filter', filterParams)
      .then(res => {
        console.log('filter: axios.post: success', res);
        // this.setState({ persons });
      }
    ).catch(err => {
      console.log('filter: axios.post: error', err);
    });
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
            ...filterParams,
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

  const disableSearchButton = () => {
    return Object.values(filterParams).every(x => x === null || x === '');
  };

  const getTextFields = (filterOptions) => {
    return <Box sx={{ 
      p: 2,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {filterOptions.map((option) => (
        <TextField
          {...getFilterTextFieldsProps(option)}
        />))
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
