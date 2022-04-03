import { Alert, Container, Grid, Snackbar, TextField } from "@mui/material";
import *  as React from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';  
import axios from 'axios';
import { POST_SERVICE } from "../../constants/Api";

  export default function ServiceForm(props) {
    const { open, title, setDialogOpenState,handlePost } = props;
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
    const [base64Images,setbase64Images] =  React.useState([]);
    const [snackbar, setSnackBar] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');

    const images = [];

    const handleClose = () => {
      setDialogOpenState();
   };

    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackBar(false);
    };

      const _handleReaderLoaded = e => {
        let binaryString = e.target.result;
        const base64Image = {
          name:"",
          image_data: btoa(binaryString),
          type:""
        }
        images.push(base64Image)
        setbase64Images(images);
      };

      const onFileChange = (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i]) {
              const reader = new FileReader();
            reader.onload = _handleReaderLoaded.bind(this);
              reader.readAsBinaryString(e.target.files[i]);
              console.log('file uploaded: ', e.target.files[i]);
            }
        }       
      };

      const submitServicePost = (initialValues) => {
        const postData = {
          "user_id": localStorage.getItem("userId"),
          'service_name': serviceName,
          'service_type': serviceType,
          'cost': cost,
          'plan': plan,
          'description': description,
          'city': city,
          'province': province,
          'country': country,
          'pincode': pincode,
          'address': address,
          'review_id': null,
          'images':[...base64Images]
        }

      axios({
        method: 'post',
        url: POST_SERVICE,
        data: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        }
        })
        .then(function (response) {
            setSnackBar(true);
            setSeverity("success");
            setDialogOpenState(false);
            resetForm();
            handlePost()
        })
        .catch(function (response) {
        });
      };

      const resetForm = () => {
        setServiceName('')
        setServiceType('')
        setCost(0)
        setPlan('')
        setDescription('')
        setCity('')
        setProvince('')
        setCountry('')
        setPincode('')
        setAddress('')
        setbase64Images([])
      }

    return( <Dialog onBackdropClick={handleClose} onClose={handleClose} open={open}>
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
                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Anually"}>Anually</MenuItem>
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
      <Grid item xs={6}> <Typography variant="h6" gutterBottom component="div">
          Upload Images
      </Typography>
      </Grid>
      <Grid item xs={6}>
      <label htmlFor="icon-button-file">
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={onFileChange}
        />
      </label>
      </Grid>
      <div style={{ padding: 20 }}>
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity={severity} sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
      <Button variant="contained" onClick={submitServicePost}>Post</Button>
      </Container>

      <div style={{ padding: 20 }}></div>
     
      </Dialog>);
 }