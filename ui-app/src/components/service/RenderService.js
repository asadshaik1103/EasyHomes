import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import *  as React from "react";
import { AddFavorite } from "../Icons";
import Service from "./Service";

export const RenderService = ({ service, handlePost }) => {
    const blobData= service.images[0]?.image_data ;
    const [dialogOpened, setDialogOpened] = React.useState(false);
    const imageSrc = blobData ? `data:image/jpeg;base64,${blobData}` : ''
  
    const date = service?.posted_on
    const postedDate = date ? date.split('T')[0] : ''
    return (
      <>
      {dialogOpened?<Service
        open={dialogOpened}
        onClose={setDialogOpened}
        setDialogOpenState={setDialogOpened}
        service = {service}
      />:<></>}
      <Grid item xs={4}>
        <Card style={style.ServiceFeed} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" />
            }
            title={service.user_name}
            subheader={postedDate}
          />
          <CardMedia
            component="img"
            height="194"
            image={imageSrc}
          />
          <CardActions disableSpacing style={{justifyContent:'space-between'}}>
          <IconButton aria-label="add to favorites">
            <AddFavorite />
            </IconButton>
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
            <Stack direction="row" spacing={1}>
            <Chip size="small" label={service.plan}/>
            </Stack>
            <Typography marginTop={2.5} fontSize={16}>{service.address + " ,"+ service.pincode}</Typography>
            
            <Typography fontSize={16}>{service.city + ",  " 
            + service.province + ", " +  service.country} </Typography>
          </CardContent>
          <CardActions>
          <Button style={{borderRadius:'20px'}} variant='contained' onClick={()=>{setDialogOpened(true)}}
                        size="small">Learn More</Button>
        </CardActions>
        </Card>
      </Grid>
      </>
    );
  };
  
  const style = {
    ServiceFeed: {
      backgroundColor: "#F5F5F5",
      borderRadius: 25,
    },
  };