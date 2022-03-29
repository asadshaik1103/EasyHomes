import *  as React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
 
export default function Payment() { 

    const [billingDetails, setBillingDetails] = React.useState("");
    const [succeeded, setSucceeded] = React.useState(false);
    const [paypalErrorMessage, setPaypalErrorMessage] = React.useState("");
    const [orderID, setOrderID] = React.useState(false);
    

    const createOrder = (data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  value: 50,
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
          setSucceeded(true);
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