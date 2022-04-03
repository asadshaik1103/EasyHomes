import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import *  as React from "react";
import { AddFavorite } from "../Icons";
import Property from "./Property";

export const RenderProperty = ({ property }) => {
    const blobData= property.images[0]?.image_data ;
    const [dialogOpened, setDialogOpened] = React.useState(false);
  
    const date = property?.posted_on
    const postedDate = date ? date.split('T')[0] : ''
    const imageSrc = blobData ? `data:image/jpeg;base64,${blobData}` : ''
  
    return (
        <>
        {dialogOpened?<Property
        open={dialogOpened}
        onClose={setDialogOpened}
        setDialogOpenState={setDialogOpened}
        property = {property}
      />:<></>}
      <Grid item xs={4}>
       <Card style={style.ServiceFeed} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" />
        }
        title={property.user_name} 
        subheader = {postedDate}
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