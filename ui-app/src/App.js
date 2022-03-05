import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import { updatePageState } from './reducers/app/appSlice';
import HomePage from './Pages/HomePage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePageState({ pageLoaded: 1 }));
  })
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
