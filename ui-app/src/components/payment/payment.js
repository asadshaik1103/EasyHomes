import *  as React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { POST_PAYMENT } from "../../constants/Api";

export default function Payment(props) {
     const{ service, setToastMessage } = props;
    const [billingDetails, setBillingDetails] = React.useState("");
    const [succeeded, setSucceeded] = React.useState(false);
    const [paypalErrorMessage, setPaypalErrorMessage] = React.useState("");
    const [orderID, setOrderID] = React.useState(false);
  

    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSucceeded(false);
    };
    

    const createOrder = (data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  // value: service?.cost,
                  value:"0.5",
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          })
          .then((orderID) => {
            setOrderID(orderID);
            return orderID;
          });
      };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
          const {payer} = details;
          setBillingDetails(payer);
          setToastMessage(true)
          const paymentDetails ={
            "user_id":localStorage.getItem("userId"),
            "amount":service?.cost,
            "service_id":service?.service_id
          };
          JSON.stringify(paymentDetails)
          axios({
            method: 'post',
            url: POST_PAYMENT,
            data: JSON.stringify(paymentDetails),
            headers: {
              'Content-Type': 'application/json'
            }
            })
            .then(function (response) {
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        })
      };
    // handles payment errors
    const onError = (data,actions)=>{
       setPaypalErrorMessage("Something went wrong with your payment");
    }


    const initialOptions = {
        "client-id": "test",
        "currency": "CAD",
        "intent": "capture",
    };
    
    return ( 
        <PayPalScriptProvider options={initialOptions}> 
            <PayPalButtons style={{ layout: "vertical" }} 
            createOrder={createOrder} onApprove={onApprove} 
            /> 
        </PayPalScriptProvider> 
    ); 
}