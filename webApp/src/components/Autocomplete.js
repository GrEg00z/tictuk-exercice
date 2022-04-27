import {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function Autocomplete({loadOptions, label = "Search", propertyName = "name"}) {

  const container = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState([]);
  const [itemSelected, setItemSelected] = useState(false);

  const handleOutsideClick = useCallback((e) => {
    if (!container.current.contains(e.target)){
      setResult([]);
      !itemSelected && setInputValue("");
    }
  }, [itemSelected])

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick])

  const handleChange = (event) => {
    let input = event.target.value;
    setInputValue(input)
    setItemSelected(false);

    // if input is empty
    if(input.length === 0) {
      setResult([]);
      return false;
    }

    // if loadOptions is provided
    if(loadOptions)
      loadOptions(input, (result) => {

        // check if propertyName really exists in loadOption result callback
        if(result.length > 0 && result[0][propertyName] === undefined) {
          console.error("The property '" + propertyName + "' doesn't exist in your data options")
          return false;
        }

        setResult(result);
      });
  }

  const onItemClick = (item) => {
    setInputValue(item[propertyName]);
    setItemSelected(true);
    setResult([]);
  }

  return (
    <Container ref={container}>
      <TextField 
        fullWidth 
        id="outlined-basic" 
        value={inputValue}
        label={label}
        variant="outlined" 
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <ResultContainer>
        {result.map((item) => {
          return <ResultItem key={item[propertyName]} onClick={() => onItemClick(item)}>{item[propertyName]}</ResultItem>
        })}
      </ResultContainer>
    </Container>
  );
}

// Proptype
Autocomplete.propTypes = {
  loadOptions: PropTypes.func,
  propertyName: PropTypes.string,
  label: PropTypes.string
}

// Styled components
const Container = styled.div`
  width: 260px;
  margin: 15px;
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

export default Autocomplete;