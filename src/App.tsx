import './App.css'
import { DecrementAction, IncrementAction, CounterId,  useAppSelector, useAppDispatch, selectCounter } from './store';
import { UsersList } from './users-list';

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

export function Counter({counterId} : {counterId : CounterId}){
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) => selectCounter(state, counterId) ); 

  console.log('render counter', counterId);

  // const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  // useEffect(() => {
  //   const unsubscripe = store.subscribe(() => {
  //     const currentState = selectCounter(store.getState(), counterId);
  //     const lastStaste = lastStateRef.current;

  //     if (currentState !== lastStaste) {
  //       forceUpdate();
  //     }

  //     lastStateRef.current = currentState;
  //   });

  //   return unsubscripe;
  // }, []);

  return (
    <div className='flex flex-row gap-4 items-center'>
      counter {counterState?.counter}
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => dispatch({type:'increment', payload:{counterId:counterId}} satisfies IncrementAction)}>
        increment
      </button>
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => dispatch({type:'decrement', payload:{counterId:counterId}} satisfies DecrementAction)}>
        decrement
      </button>
    </div>
  );
}

export default App
