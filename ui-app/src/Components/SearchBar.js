import { Button, TextField } from "@mui/material";
import {SearchIcon} from "./Icons";
import "./../Styles/HomePageStyle.css";
import axios from "axios";

const SearchBar = () => {
  return (
    <div style={{ margin: "1%" }}>
      <TextField  className="SearchBar" label="Search" id="fullWidth" />
      <Button onClick={()=> console.log(axios.get("http://localhost:8080/service/services").then(res => console.log(res.data)))} 
      variant="contained" startIcon={<SearchIcon />}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
  