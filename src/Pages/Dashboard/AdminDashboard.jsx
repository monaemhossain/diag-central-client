import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AllUsers from '../../Components/AllUsers/AllUsers';
import { Container } from '@mui/system';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100%" }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ borderRight: 1, borderColor: 'divider', width: 250 }}
            >
                <Tab label="All Users" {...a11yProps(0)} />
                <Tab label="Add a Test" {...a11yProps(1)} />
                <Tab label="Reservations" {...a11yProps(2)} />
                <Tab label="Add banner" {...a11yProps(3)} />
                <Tab label="All Banners" {...a11yProps(4)} />
            </Tabs>

            <TabPanel component="div" variant="body2" value={value} index={0}>
                <Container maxWidth="lg">
                    <AllUsers />
                </Container>
            </TabPanel>

            {/* <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>

            </TabPanel>
            <TabPanel value={value} index={3}>

            </TabPanel>
            <TabPanel value={value} index={4}>

            </TabPanel> */}
        </Box>
    );
}