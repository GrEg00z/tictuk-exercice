import {useState} from 'react';
import TextField from '@mui/material/TextField';

function Autocomplete(props) {

  const [result, setResult] = useState([]);

  const handleChange = (event) => {
    let value = event.target.value;

    if(value.length === 0) {
      setResult([]);
      return false;
    }

    props.loadOptions(value, loadData);
  }

  const loadData = (result) => {
    setResult(result.length > 0 ? result : [{name : "No result found"}]);
  }

  return (
    <div className="autocomplete-container">
      <TextField fullWidth id="outlined-basic" label="Search..." variant="outlined" onChange={handleChange} onBlur={() => setResult([])} />
      <div className="result-container">
        {result.map((value) => {
          return <span key={value.name}>{value.name}</span>
        })}
      </div>
    </div>
  );
}

export default Autocomplete;
