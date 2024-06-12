import { useState } from 'react'
import Calendar from 'react-calendar'
import './App.css'
import { haikus } from './data';
// import 'react-calendar/dist/Calendar.css';
const today = new Date();
const firstDay = new Date('2024-05-12');

const noHaikuWritten = 'Didn\'t write any for this day :(';

const NewlineText = (props) => {
  const text = props.text;
  const newText = text.split('\n').map(str => <p>{str}</p>);
  
  return newText;
}

function App() {
  const [value, setValue] = useState(new Date());
  const [selectedHaiku, setSelectedHaiku] = useState('Select a date :)');

  const onClickDay = (value, event) => {
    const foundHaiku = haikus.find((haiku) => haiku.date == value.toLocaleDateString());
    let finalHaiku = foundHaiku?.haiku ?? noHaikuWritten;
    if(foundHaiku?.isSpg) {
      const password = prompt("Password");
      const correctPassword = password === 'dinosaur<3';
      if(!correctPassword) {
        finalHaiku = "This is not meant for you.";
      }
    }
    setSelectedHaiku(finalHaiku);
  }

  return (
    <>
    <div className='calendar-container'>
      <Calendar onClickDay={onClickDay} value={value} maxDate={today} minDate={firstDay}/>
    </div>
    <div className='haiku'>
      <NewlineText text={selectedHaiku} />
    </div>
    </>
  )
}

export default App
