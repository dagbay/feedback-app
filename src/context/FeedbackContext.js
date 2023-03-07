import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  
  // Hooks
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
 
  // Functions
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem} : item))
    )
  }

  return (
    <FeedbackContext.Provider value={{
      feedback,
      feedbackEdit,
      addFeedback,
      deleteFeedback,
      editFeedback,
      updateFeedback,
    }}>
      {children}
    </FeedbackContext.Provider>
  )
} 

export default FeedbackContext