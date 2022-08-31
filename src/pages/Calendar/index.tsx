import { useState } from 'react';
import Calendar from 'react-calendar';

const MainCalendar = () =>{
  const [value, onChange] = useState(new Date());
  return <Calendar onChange={onChange} value={value} />;
};

export default MainCalendar;