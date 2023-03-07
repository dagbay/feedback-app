// Package Imports
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Component Imports
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutIconLink from './components/AboutIconLink'

// Pages 
import AboutPage from './pages/AboutPage'

// Context
import { FeedbackProvider } from './context/FeedbackContext'

// App Component
function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
          <div className="container">

            {/* Routes */}
            <Routes> 
              {/* Home Route */}
              <Route 
                exact path='/' 
                element={
                  <>
                    <FeedbackForm />
                    <FeedbackStats />
                    <FeedbackList />
                  </>
                } 
              />
              
              {/* About Page Route */}
              <Route exact path='/about' element={<AboutPage />} />
            </Routes> 
          </div>
          <AboutIconLink />
      </Router>  
    </FeedbackProvider>
  )
}

export default App