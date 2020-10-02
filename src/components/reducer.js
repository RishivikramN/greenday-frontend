export const initialState={
    products:[],
    search:"",
    sortType:1,
    sortClicked:1,
    isLoading:1,
    totalProducts:0,
    currentPage:1,
    loadMoreVisible:1
}

export const reducer=(state,action)=>{
    switch (action.type) {
        case "ADD_PRODUCTS":
            return {...state,
                products: action.item
            };
    
        case "APPEND_PRODUCTS":
            return {
                ...state,
                products: [...state.products,...action.item]
            }
        case "SET_LOADMOREVISIBLE":
            return {
                ...state,
                loadMoreVisible:action.item
            }

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

        case "TOTAL_PRODUCTS":
            return {
                ...state,
                totalProducts:action.item
            }

        case "SET_CURRENTPAGE":
            return {
                ...state,
                currentPage:action.item
            }

        default:
            return state;
    }
}

