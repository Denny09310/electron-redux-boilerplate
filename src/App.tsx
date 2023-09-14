import { Provider as ReduxStoreProvider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'

import { history, store } from '@/app/store'
import ThemeProvider from '@/components/providers/theme-provider'
import Index from '@/routes'

function App() {
  return (
    <ReduxStoreProvider store={store}>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </HistoryRouter>
      </ThemeProvider>
    </ReduxStoreProvider>
  )
}

export default App
