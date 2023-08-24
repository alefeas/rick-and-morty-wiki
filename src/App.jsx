import './styles/styles.scss';
import { AppRoutes } from './appRoutes/AppRoutes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/footer/Footer.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
