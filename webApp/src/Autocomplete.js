import {useState} from 'react';
import styled from 'styled-components';
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
    <Container>
      <TextField fullWidth id="outlined-basic" label="Search..." variant="outlined" onChange={handleChange} onBlur={() => setResult([])} />
      <ResultContainer>
        {result.map((value) => {
          return <ResultItem key={value.name}>{value.name}</ResultItem>
        })}
      </ResultContainer> 
    </Container>
  );
}

export default Autocomplete;


// Styled components

const Container = styled.div`
  width: 260px;
`;

const ResultContainer = styled.div`
  max-height: 254px;
  width: 260px;
  margin-top: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  background-color: white;
  z-index: 2;
`;

const ResultItem = styled.span`
  width: 240px;
  padding-right: 18px;
  display: list-item;
  list-style: none;
  border-left: solid 1px silver;
  border-right: solid 1px silver;

  &:hover {
    background-color: #c0c0c0;
  }

  &:last-child {
    border-bottom: solid 1px silver;
  }
`;
