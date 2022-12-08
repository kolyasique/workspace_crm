/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import TaskList from './UI/TaskList/TaskList';
import Clients from './UI/Clients/Clients';
import Documents from './UI/Documents/Documents';
import './TabPanelUser.css';
import Stat from './UI/Stat/Stat';
import CalendarComponent from '../Calendar/Calendar';
import ChatContextProvider from '../../context/Main.context';
import Messages from './UI/Messages/Messages';

const functionalBlocks = {

};
export default function VerticalTabs({ socket }) {
  const [component, setComponent] = useState(<TaskList />);
  const [activeButton, setActiveButton] = useState('1');

  return (
    <div className="box">
      <div className="leftMenu">
        <button id="1" className={activeButton === '1' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<TaskList />); }}>Главная</button>
        <button id="2" className={activeButton === '2' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<Stat />); }}> Статистика</button>
        <button id="3" className={activeButton === '3' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<Messages socket={socket} />); }}>Сообщения</button>
        <button id="4" className={activeButton === '4' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<Clients />); }}>Клиенты</button>
        <button id="5" className={activeButton === '5' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<CalendarComponent />); }}>Календарь</button>
        <button id="6" className={activeButton === '6' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<CalendarComponent />); }}>Сотрудники</button>
      </div>
      <div className="rightComponents">{ component }</div>
    </div>

  // function TabPanel(props) {
  //   const {
  //     children, value, index, ...other
  //   } = props;

  //   return (
  // <div
  //   role="tabpanel"
  //   hidden={value !== index}
  //   id={`vertical-tabpanel-${index}`}
  //   aria-labelledby={`vertical-tab-${index}`}
  //   {...other}
  // >
  //   {value === index && (
  //     <Box sx={{ p: 3 }}>
  //       {children}
  //     </Box>
  //   )}
  // </div>

  //   );
  // }

  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.number.isRequired,
  //   value: PropTypes.number.isRequired,
  // };

  // function a11yProps(index) {
  //   return {
  //     id: `vertical-tab-${index}`,
  //     'aria-controls': `vertical-tabpanel-${index}`,
  //   };
  // }

  //   const [value, setValue] = React.useState(0);
  //   const [checked, setChecked] = React.useState([0]);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  //   return (
  // <Box
  //   sx={{
  //     flexGrow: 1, bgcolor: 'aliceblue', borderRadius: '5px', display: 'flex', height: 500, width: 800, alignSelf: 'center',
  //   }}
  // >
  //   <Tabs
  //     orientation="vertical"
  //     variant="scrollable"
  //     value={value}
  //     onChange={handleChange}
  //     aria-label="Vertical tabs example"
  //     sx={{ borderRight: 1, borderColor: 'divider' }}
  //   >
  //     <Tab label="Главная" {...a11yProps(0)} />
  //     <Tab label="Моя статистика" {...a11yProps(1)} />
  //     <Tab label="Клиенты" {...a11yProps(2)} />
  //     <Tab label="Сообщения" {...a11yProps(3)} />
  //     <Tab label="Документы" {...a11yProps(4)} />

  //   </Tabs>
  //   <TabPanel value={value} index={0}>
  //     <TaskList checked={checked} setChecked={setChecked} />
  //   </TabPanel>
  //   <TabPanel value={value} index={1}>
  //     Здесь будет статистика
  //   </TabPanel>
  //   <TabPanel value={value} index={2}>
  //     <Clients />
  //   </TabPanel>
  //   <TabPanel value={value} index={3}>
  //     <AlignItemsList />
  //   </TabPanel>
  //   <TabPanel value={value} index={4}>
  //     fdfd
  //   </TabPanel>
  //   <TabPanel value={value} index={5}>
  //     Item Six
  //   </TabPanel>
  //   <TabPanel value={value} index={6}>
  //     Item Seven
  //   </TabPanel>
  // </Box>

  );
}
