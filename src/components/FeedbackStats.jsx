import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  const  { feedback } = useContext(FeedbackContext)

  let ratingAverage = 
  feedback.reduce((acc, cur) => {
    return acc + cur.rating
  }, 0) / feedback.length

  ratingAverage = ratingAverage.toFixed(1).replace(/[.,]0$/,'')

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(ratingAverage) ? 0 : ratingAverage}</h4>
    </div>
  )
}

export default FeedbackStats
