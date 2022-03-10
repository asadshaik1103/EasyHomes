import { Container, Grid, TextField } from "@mui/material";
import *  as React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';  
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// const initialValues ={
//     id:0,
//     propertyName:'',
//     propertyType:'',
//     amenities:'',
//     bedrooms:0,
//     bathrooms:0,
//     parkingInclude:false,
//     rent:0.0,
// }
  export default function SimpleDialog(props) {
    const { onClose, open, title } = props;
    const [propertyName, setPropertyName] = React.useState('');
    const [propertyType, setPropertyType] = React.useState('');
    const [bedrooms, setBedrooms] = React.useState('');
    const [bathrooms, setBathrooms] = React.useState('');
    const [rent, setRentChange] = React.useState('');

    const [state, setState] = React.useState({
      laundry: true,
      wifi: false,
    });
  
    const handleChange = (event) => {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
      });
    };
  
    const { laundry, wifi} = state;

    const [parkingIncluded, setParkingIncluded] = React.useState(true);

    const handlsetParkingIncludedeChange = (event) => {
        setParkingIncluded(event.target.checked);
    };


    const handleRentChange = (event) => {
      setRentChange(event.target.value);
    };
    const handleClose = () => {
        onClose();
      };

      const handlePropertyTypeChange = (event) => {
        setPropertyType(event.target.value);
      };

      const handleBedroomsChange = (event) => {
        setBedrooms(event.target.value);
      };
      const handleBathroomsChange = (event) => {
        setBathrooms(event.target.value);
      };

      const Input = styled('input')({
        display: 'none',
      });

      const handlePropertyNameChange = (event) => {
        setPropertyName(event.target.value);
      };

      const submitPropertyPost = () => {
      //  alert("Property Saved");
      //  const property ={
      //    propertyName : {propertyName}
      //  };
      //  axios.post("http://localhost:8080/properties/", property).then(response =>{
      //   alert("backen hit successul");
      //    if(response.data != null)
      //    {
      //      alert("backen hit successul");
      //    }
      //  });

      };
      

          
    return( <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <Container  maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                required
                id="propertyName"
                name="propertyName"
                label="Property Name"
                value={propertyName}
                onChange={handlePropertyNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="add-property-dialog-property-type">
                  Property Type
                </InputLabel>
                <Select
                labelId="add-property-dialog-property-type-label"
                id="add-property-dialog-property-type-id"
                label="Property Type"
                value={propertyType}
                onChange={handlePropertyTypeChange}
                >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="add-property-dialog-bedrooms">
                  Bedrooms
                </InputLabel>
                <Select
                labelId="add-property-dialog-bedrooms-label"
                id="add-property-dialog-bedrooms-id"
                label="Bedrooms"
                value={bedrooms}
                onChange={handleBedroomsChange}
                >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="add-property-dialog-bathrooms">
                  Bathrooms
                </InputLabel>
                <Select
                labelId="add-property-dialog-bathrooms-label"
                id="add-property-dialog-bedrooms-id"
                label="Bathrooms"
                value={bathrooms}
                onChange={handleBathroomsChange}
                >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs ={6}>
              <FormGroup>
                <FormControlLabel control={<Checkbox   
                  checked={parkingIncluded}
                  onChange={handlsetParkingIncludedeChange} />} label="Parking Included" />
              </FormGroup>
            </Grid>
            <Grid item xs>
            <FormControl fullWidth sx>
              <InputLabel htmlFor="post-property-dailog-rent">Rent</InputLabel>
              <OutlinedInput
                id="post-property-dailog-rent"
                value={rent}
                onChange={handleRentChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Rent"
              />
            </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Amenities</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={laundry} onChange={handleChange} name="laundry" />
                }
                label="Laundry Services"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={wifi} onChange={handleChange} name="wifi" />
                }
                label="Free Wifi"
              />
            </FormGroup>
          </FormControl>
            </Grid>
          </Grid>
        </Container>
        <div style={{ padding: 20 }}></div>
        <Container  maxWidth="md">
          <Grid item xs={6}> <Typography variant="h4" gutterBottom component="div">
          Property Address
          </Typography>
          </Grid>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
                required
                id="propertyLocation"
                name="propertyLocation"
                label="Property Location"
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="province"
                name="province"
                label="Province"
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                fullWidth
              />
          </Grid>
      </Grid>
      </Container>
      <Container  maxWidth="md">
      <div style={{ padding: 20 }}></div>  
      <Grid item xs={6}> <Typography variant="h4" gutterBottom component="div">
          Add Images
      </Typography>
      </Grid>
      <Grid item xs={6}>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <AddAPhotoIcon  fontSize="large"/>
        </IconButton>
      </label>
      </Grid>
      <div style={{ padding: 20 }}></div>
      <Button variant="contained" onClick={submitPropertyPost}>Post</Button>
      </Container>

      <div style={{ padding: 20 }}></div>
     
      </Dialog>);
 }