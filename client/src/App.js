import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Cart from './routes/Cart';
import Header from './components/Header';
import Book from './routes/Book';
import axios from 'axios';
import Checkout from './routes/Checkout';
import Invoice from './routes/Invoice'

axios.defaults.withCredentials = true;

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/cart' component={Cart} />
				<Route path='/book' component={Book} />
				<Route path='/checkout' component={Checkout} />
				<Route path='/invoice' component={Invoice} />
				<Route path='/' render={() => <p>404 not found</p>} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
