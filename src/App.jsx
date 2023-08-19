import './styles/styles.scss';
import { AppRoutes } from './appRoutes/AppRoutes.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
