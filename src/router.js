import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import IndexPage from './routes/IndexPage'
import HotSwappingIntlProvider from './provider/HotSwappingIntlProvider'

function RouterConfig({ history }) {
  return (
    <HotSwappingIntlProvider>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
        </Switch>
      </Router>
    </HotSwappingIntlProvider>
  )
}

export default RouterConfig
