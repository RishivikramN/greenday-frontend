export const initialState={
    products:[],
    search:"",
    sortType:"asc",
    sortClicked:1,
    isLoading:1
}

export const reducer=(state,action)=>{
    switch (action.type) {
        case "ADD_PRODUCTS":
            return {...state,
                products: action.item
            };
    
        case "ADD_SEARCH_INPUT":

            return {
                ...state,
                search: action.item
            };

        case "IS_CLICKED":

            return {
                ...state,
                sortClicked:action.item
            }

        case "IS_SORTED":
            return {
                ...state,
                sortType:action.item
            }

        case "IS_LOADING":
            return {
                ...state,
                isLoading:action.item
            }

        default:
            return state;
    }
}

