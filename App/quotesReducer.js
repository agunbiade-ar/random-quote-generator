const quotesReducer = ( state, action ) => {
    switch( action.type ){
        case "QUOTES_FETCH_INIT":  return {
            ...state, isLoading: true, isError: false
        }

        case "QUOTES_FETCH_SUCCESS":  return {
            ...state,
            isLoading: false,
            hasLoaded: true,
            isError: false,
            data: action.payload.data
        }

        case "QUOTES_FETCH_FAILURE": return {
            ...state, isLoading: false, isError: true
        }

        default: throw new Error()
    }
}

export default quotesReducer