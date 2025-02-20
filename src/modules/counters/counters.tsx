import { useAppDispatch, useAppSelector } from "../../shared/redux";
import { selectCounter, CounterId, incrementAction, decrementAction } from './counters.slice';

export function Counter({counterId} : {counterId : CounterId}){
    const dispatch = useAppDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId) ); 
  
    console.log('render counter', counterId);
    // закомментирована примерная работа селектора UseSelector
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
    
        // работа с dispacth через bindActionCreators
    // const actions = bindActionCreators(
    //   {
    //     incrementAction,
    //     decrementAction,
    //   },
    //   dispatch
    // );
  
    // return (
    //   <div className='flex flex-row gap-4 items-center'>
    //     counter {counterState?.counter}
    //     <button 
    //       className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
    //       onClick={() => actions.incrementAction({counterId})}
    //     >
    //       increment
    //     </button>
    //     <button 
    //       className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
    //       onClick={() => actions.decrementAction({counterId})}
    //     >
    //       decrement
    //     </button>
    //   </div>
    // );
  
    return (
      <div className='flex flex-row gap-4 items-center'>
        counter {counterState?.counter}
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
          onClick={() => dispatch(incrementAction({counterId}))}
        >
          increment
        </button>
        <button 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
          onClick={() => dispatch(decrementAction({counterId}))}
        >
          decrement
        </button>
      </div>
    );
}

export function Counters() {
  return(
    <div className='flex flex-col items-center gap-5 py-5'>
          <Counter counterId='first'/>
          <Counter counterId='second'/>
    </div>
  );
}