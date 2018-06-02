import ReactDOM from 'react-dom'
import createLoading from 'dva-loading'
import dva from 'dva'
import './index.scss'

// 1. Initialize
const app = dva()

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require('./models/example').default)
app.model(require('./models/locale').default)
app.model(require('./models/player').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
const App = app.start()

ReactDOM.render(
  <App />
  , document.getElementById('root')
)
