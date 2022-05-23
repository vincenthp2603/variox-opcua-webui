import './App.css';
import "@patternfly/react-core/dist/styles/base.css";

import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/header';
import SearchInputBlock from './components/SearchInputBlock/searchinputblock';
import MainApp from './components/MainApp/mainapp';


function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <SearchInputBlock />
        <MainApp />
      </div>
    </Provider>
  );
}

export default App;
