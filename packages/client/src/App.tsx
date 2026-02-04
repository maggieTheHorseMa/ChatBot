import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    console.log('fetch start');
    fetch('/api/hello')
    .then(res => res.json())
    .then(data => {
      console.log('!!!!!!!!!!!!!!!!!!!!')
setMessage(data.message)
    });
  }, [])

  return (
    <p>
     {message}
    </p>
  )
}

export default App
