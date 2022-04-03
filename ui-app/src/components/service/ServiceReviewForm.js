import { Alert, Container, Grid, Rating, Snackbar, TextField } from "@mui/material";
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
import { POST_SERVICE_REVIEW } from "../../constants/Api";

export default function ServiceReviewForm(props) {
    const { service } = props;
    // const [serviceId, setserviceId] = React.useState('');
    // const [userId, setuserId] = React.useState('');
    const [reviewSubject, setreviewSubject] = React.useState('');
    const [reviewDescription, setreviewDescription] = React.useState('');
    const [reviewRating, setreviewRating] = React.useState(1);

    
    const submitServiceReviewPost = (initialValues) => {
        const postData = {
        'user_id': localStorage.getItem("userId"),
        'service_id': service.service_id,
        'review_subject': reviewSubject,
        'review_description': reviewDescription,
        'review_rating': reviewRating,
        }
        console.log(postData)
        axios({
            method: 'post',
            url: POST_SERVICE_REVIEW,
            data: JSON.stringify(postData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(function (response){
            resetForm();
        })
        .catch(function (response){
            console.log(response);
        })
    };

    const resetForm = () => {
        setreviewSubject('');
        setreviewDescription('');
        setreviewRating(0);
    }

    console.log("dwfhh");

    return( 
        <Container maxWidth="md">
            <Grid conatiner spacing ={2}>
                <Grid item xs={6}>
                    <TextField
                        required
                        id = "reviewSubject"
                        name = "reviewSubject"
                        label = "Review Subject"
                        value={reviewSubject}
                        onChange={(e)=>{setreviewSubject(e.target.value)}}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id = "reviewDescription"
                        name = "reviewDescription"
                        label = "Review Description"
                        value={reviewDescription}
                        onChange={(e)=>{setreviewDescription(e.target.value)}}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Rating 
                        required
                        id = "reviewRating"
                        name="simple-controlled" 
                        value={reviewRating} 
                        onChange={(e)=>{setreviewRating(e.target.value)}}
                    />
                </Grid>
                
            </Grid>
            <Button variant="contained" onClick={submitServiceReviewPost}>Submit a Review</Button>
        </Container>

    )




}