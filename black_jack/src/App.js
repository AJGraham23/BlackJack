import Layout from './hoc/layout/layout'
import Game from './containers/Game/Game'
import { Route } from 'react-router-dom'
import Help from './containers/Help/Help';

function App() {
  return (
    <div className="App">
        <Layout>
            sup?
        </Layout>
      <Route path='/' exact component={Game}></Route>
      <Route path='/help' exact component={Help}></Route>
     
    </div>
  );
}

export default App;
