import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  
  // Hooks
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
 
  // Functions
  const deleteFeedback = async (id) => {
    await fetch(`/feedback/${id}`, {
      method: 'DELETE'
    })

    if(window.confirm('Are you sure you want to delete this feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await res.json()

    setFeedback([data, ...feedback])
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = async (id, updItem) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await res.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data} : item))
    )
  }

  // API Functions

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const res = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await res.json()
    setFeedback(data)
    setIsLoading(false)
  }

  return (
    <FeedbackContext.Provider value={{
      // Getter 
      feedback,
      isLoading,

      // Setter
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