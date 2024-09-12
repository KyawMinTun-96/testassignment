import {useState, useEffect, useRef} from 'react';

function FocusableInput () {

  const[isTouched, setIsTouched] = useState(false);
  const[inputValue, setInputValue] = useState('');
  const[error, setError] = useState('');
  const inputRef = useRef(null);
  

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleBlur = () => {
    setIsTouched(true);
    if(!inputValue.trim()) {
      setError('This field is required.');
    }
  }


  const handleChange = (e) => {
    const value =  e.target.value;
    if(/^[a-zA-Z0-9]*$/.test(value)) {
      setInputValue(value);
      setError('');
    }
  }


  return(
    <div className='mb-5'>
      <h1 className='text-center'>FocusableInput</h1>
      <input 
        className='focus-input'
        type='text' 
        value={inputValue} 
        onChange={handleChange} 
        onBlur={handleBlur}
        ref={inputRef} 
        placeholder="Enter alphanumeric characters" 
        style={{borderColor: error ? 'red' : '#ccc'}} 
      />

      {
        isTouched && error && (
          <div className='error'>{error}</div>
        )
      }
    </div>
  )
} 

export default FocusableInput;































