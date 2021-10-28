import ReactDOM from 'react-dom';
import MainHeader from './components/MainHeader';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><MainHeader /><App /></BrowserRouter> , document.getElementById('root'));