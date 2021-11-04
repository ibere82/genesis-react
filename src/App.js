import Page from './components/main/Page';
import useStateManager from './hooks/useStateManager.js';
import * as soundApi from './apis/soundApis.js';
import useEffectsManager from './hooks/useEffectsManager';
import initialState from './state/gameState';


function App() {

  const [ currentState, dispatch ] = useStateManager(initialState);

  useEffectsManager(currentState, dispatch, soundApi)

  return (
    <Page
      currentState={currentState}
      dispatch={dispatch}
    />
  );
};

export default App;
