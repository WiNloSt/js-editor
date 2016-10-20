import {
  UPDATE_CODE,
  APPEND_CONSOLE_OUTPUT,
  RUN_CODE
} from '../actions'

const initialState = {
  code:
`// edit your code here
console.log('hello world')
`,
  consoleOutput: ['// initial value from store']
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.code
      }
    case APPEND_CONSOLE_OUTPUT:
      return {
        ...state,
        consoleOutput: [...state.consoleOutput, ...action.consoleOutput]
      }
    case RUN_CODE:
      runCode(state.code)
      return state

    default:
      return state
  }
}

function runCode(code) {
  try {
    eval(code) // eslint-disable-line
  } catch (error) {
    console.error(error)
  }
}

export default reducer
