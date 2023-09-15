import { Provider as ReduxStoreProvider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'

import { history, store } from '@/app/store'
import Index from '@/routes'

import MainLayout from '@/components/layouts/main-layout'
import ThemeProvider from '@/components/providers/theme-provider'

function App() {
  return (
    <ReduxStoreProvider store={store}>
      <ThemeProvider>
        <HistoryRouter history={history}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
            </Route>
          </Routes>
        </HistoryRouter>
      </ThemeProvider>
    </ReduxStoreProvider>
  )
}

export default App
