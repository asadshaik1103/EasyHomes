import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Drawer() {
const [state, setState] = React.useState({
    drawerOpened: false
});
const anchor = 'left';

const toggleDrawer = (open) => (event) => {
    if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
    ) {
        return;
    }

    setState({ ...state, drawerOpened: open });
};

const list = () => (
    <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
        <List>
            {['Favourites'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        <StarOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
        <Divider />
            <List>
                {['Logout'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(true)}>test</Button>
                <SwipeableDrawer
                    anchor={anchor}
                    open={true}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
