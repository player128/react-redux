import './App.css'
import { Counter } from './modules/counters/counters';
import { UsersList } from './modules/users/users-list';

function App() {
  return (
    <>
      <div className="card">
        <div className='flex flex-col items-center gap-5 py-5'>
          <Counter counterId='first'/>
          <Counter counterId='second'/>
        </div>
        <UsersList/>
      </div>
    </>
  )
}



export default App
