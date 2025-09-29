import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18next from './init.js'
import LoginForm from './pages/LoginForm.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import ChannelsPage from './pages/ChannelsPage.jsx'
import RequireAuth from './pages/RequireAuth.jsx'
import SignUpForm from './pages/SignUpForm.jsx'
import { useEffect } from 'react'
import leoProfanity from 'leo-profanity'
import { Provider as RollbarProvider } from '@rollbar/react'
import { rollbarConfig } from './rollbar.config.js'
import { ToastContainer } from 'react-toastify'

const App = () => {
  useEffect(() => {
    leoProfanity.loadDictionary('ru')
  }, [])

  return (
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequireAuth><ChannelsPage /></RequireAuth>} />
            <Route
              path="/login"
              element={<LoginForm />}
            />
            <Route
              path="/signup"
              element={<SignUpForm />}
            />
            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={6000}
          />
        </BrowserRouter>
      </I18nextProvider>
    </RollbarProvider>
  )
}

export default App
