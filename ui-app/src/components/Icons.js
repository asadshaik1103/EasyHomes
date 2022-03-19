import {Search, Home, Favorite,Add} from "@mui/icons-material";

const SearchIcon = () => {
    return (<Search fontSize="large" />);
}

const HomeIcon = () => {
    return (<Home fontSize="large"/>);
}

const PlusIcon = () => {
    return (<Add/>);
}

const AddFavorite = () => {
    return (<Favorite />)
}

const Share = () => {
    return (<Share />)
}

export {HomeIcon,SearchIcon,PlusIcon,AddFavorite,Share};