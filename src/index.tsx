import App from './App';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';
function AppWithCallbackAfterRender() {
  return <Provider store={store}>
    <App />
  </Provider>
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<AppWithCallbackAfterRender />)


