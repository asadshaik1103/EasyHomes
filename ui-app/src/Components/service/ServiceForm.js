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
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { styled } from '@mui/material/styles';

  export default function ServiceForm(props) {
    const { onClose, open, title } = props;
    const [serviceName, setServiceName] = React.useState('');
    const [serviceType, setServiceType] = React.useState('');
    const [cost, setCost] = React.useState(0);
    const [plan, setPlan] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [city,setCity] =  React.useState('');
    const [province,setProvince] =  React.useState('');
    const [country,setCountry] =  React.useState('');
    const [pincode,setPincode] =  React.useState('');
    const [address,setAddress] =  React.useState('');
    const [image,setImage] =  React.useState([]);

    const ServiceData = {
      'service_name': '',
    'service_type': '',
    'cost': 0,
    'plan': '',
    'description': '',
    'city': '',
    'province': '',
    'country': '',
    'pincode': '',
    'address': '',
    'review_id': null,
    }

    const handleClose = () => {
        onClose();
      };  

      const Input = styled('input')({
        display: 'none',
      });

      const submitPropertyPost = () => {
      };
          
    return( <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <Container  maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                required
                id="serviceId"
                name="serviceName"
                label="Service Name"
                value={serviceName}
                onChange={(e)=>{setServiceName(e.target.value)}}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
                required
                id="serviceType"
                name="serviceType"
                label="Service Type"
                value={serviceType}
                onChange={(e)=>{setServiceType(e.target.value)}}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
            <Grid item xs={6}>
            <TextField
                required
                id="serviceCost"
                name="serviceCost"
                label="Service Cost"
                value={cost}
                onChange={(e)=>{setCost(e.target.value)}}
                fullWidth
              />
            </Grid>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="service-plan">
                  Plan
                </InputLabel>
                <Select
                labelId="service-plan"
                id="service-plan"
                label="Plan"
                value={plan}
                onChange={(e)=>{setPlan(e.target.value)}}
                >
                <MenuItem value={1}>Weekly</MenuItem>
                <MenuItem value={2}>Monthly</MenuItem>
                <MenuItem value={3}>Anualy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs = {12}>
            <TextField fullWidth
            label="Description"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            multiline
            maxRows={3}
            />
            </Grid>
          </Grid>
        </Container>
        <div style={{ padding: 20 }} />
        <Container  maxWidth="md">
          <Grid item xs={6}> <Typography variant="h6" gutterBottom component="div">
          Service Address
          </Typography>
          </Grid>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
                required
                id="serviceAddress"
                name="serviceAddress"
                label="Service Address"
                value={address}
                onChange={(e)=>{setAddress(e.target.value)}}
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="city"
                name="city"
                label="City"
                value={city}
                onChange={(e)=>{setCity(e.target.value)}}
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="province"
                name="province"
                label="Province"
                value={province}
                onChange={(e)=>{setProvince(e.target.value)}}
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="country"
                name="country"
                label="Country"
                value={country}
                onChange={(e)=>{setCountry(e.target.value)}}
                fullWidth
              />
          </Grid>
          <Grid item xs={6}>
            <TextField
                required
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                value={pincode}
                onChange={(e)=>{setPincode(e.target.value)}}
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
        <Input accept="image/*" id="icon-button-file"  type="file" />
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