import React,{useState} from 'react'
import UserPage from './UserPage';

function Practicepage() {
const [showPage, setShowPage] = useState(false);

return (
  <div>
    <button onClick={() => setShowPage(!showPage)}>
      Toggle Page
    </button>
  
    <div
      className={`transition-transform duration-500 transform ${
        showPage ? "translate-x-0" : "translate-x-full"
      } fixed top-0 left-0 w-full h-screen bg-white z-10`}
    >
      <UserPage/>
    </div>
  </div>
);

}

export default Practicepage
