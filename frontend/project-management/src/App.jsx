import './styles/tailwind.css'
import TaskManager from './pages/TaskManager'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <TaskManager/>
    </>
  )
}

export default App
