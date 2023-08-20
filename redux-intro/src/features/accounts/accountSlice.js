/*
createSlice
 1. It'll automatically create action creators from our reducers
 2. It makes writing these reducers a lot easier because we no longer need that switch statement and the default case is automatically handled.
 3. We can actually mutate now the state directly inside of our reducers because createSlice uses Immer under the hood.  
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // One reducer per action
    deposit(state, action) {
      state.balance += action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      prepare(amount, purpose) {
        // return a new object whic will then become the payload object in the reducer.
        return {
          payload: { amount, purpose },
        }
      },

      reducer(state, action) {
        if (state.loan > 0) return // We no longer need to return the entire state object

        state.loan = action.payload.amount
        state.balance = state.balance + action.payload.amount
        state.loanPurpose = action.payload.purpose
      },
    },
    payLoan(state, action) {
      state.loanPurpose = ""
      state.balance -= state.loan
      state.loan = 0
    },
    convertingCurrency(state, action) {
      state.isLoading = true
    },
  },
}) // Accepts an object with 3 properties: name, initialState, reducers

// console.log(accountSlice)
// We need to take them out of that objects and export them separately
export const { withdraw, requestLoan, payLoan } = accountSlice.actions // Action creators

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount }

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" })
    // API call
    console.log(getState())
    const host = "api.frankfurter.app"
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const converted = data.rates.USD
    // return action
    dispatch({ type: "account/deposit", payload: converted })
  }
}

export default accountSlice.reducer // Reducer function

/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      }
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload }
    case "account/requestLoan":
      if (state.loan > 0) return state
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      }
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      }
    case "account/convertingCurrency":
      return { ...state, isLoading: true }
    default:
      return state
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount }

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" })
    // API call
    const host = "api.frankfurter.app"
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const converted = data.rates.USD
    // return action
    dispatch({ type: "account/deposit", payload: converted })
  }
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount }
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  }
}

export function payLoan() {
  return { type: "account/payLoan" }
}
*/
