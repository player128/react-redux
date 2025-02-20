import { createAction, createReducer } from '@reduxjs/toolkit';
import { AppState } from '../../shared/redux';

type CounterState = {
    counter: number
}

export const incrementAction = createAction<{
    counterId: CounterId
}>('counters/increment')

export const decrementAction = createAction<{
    counterId: CounterId
}>('counters/decrement')

type CountersState = Record<CounterId, CounterState | undefined>

export type CounterId = string;

const initialCounterState: CounterState = { counter:0 };
const initialCountersState: CountersState = {}

export const counterReducer = 
createReducer(initialCountersState, (builder) => {
    builder.addCase(incrementAction, (state, action) => {
        // До использования immera
        // const { counterId } = action.payload;
        //const currentCounter = state[counterId] ?? initialCounterState;

        // return {
        //     ...state,
        //     [counterId]: {
        //         ...currentCounter,
        //         counter: currentCounter.counter + 1,
        //     }
        // }

        const { counterId } = action.payload;

        if (!state[counterId]) {
            // всегда создаем новый объект, иначе другие счеткики не будут работать
            state[counterId] = {...initialCounterState};
        }
            
        state[counterId].counter++;
    })

    builder.addCase(decrementAction, (state, action) => {
        const { counterId } = action.payload;

        if (!state[counterId]) {
            state[counterId] = {...initialCounterState};
        }

        state[counterId].counter--;    
    })
});

// export const counterReducer = (state = initialCountersState, action: Action): CountersState => {
//     switch(action.type) {
//         case "increment" : {
//             const { counterId } = action.payload;
//             const currentCounter = state[counterId] ?? initialCounterState;
//             return {
//                 ...state,
//                 [counterId]: {
//                     ...currentCounter,
//                     counter: currentCounter.counter + 1,
//                 }
//             }
//         }
//         case "decrement" : {
//             const { counterId } = action.payload;
//             const currentCounter = state[counterId] ?? initialCounterState;
//             return {
//                 ...state,
//                 [counterId]: {
//                     ...currentCounter,
//                     counter: currentCounter.counter - 1,
//                 }
//             }
//         }
//         default :
//          return state;
//     }
// }

export const selectCounter = (state: AppState, counterId : CounterId) => state.counters[counterId];