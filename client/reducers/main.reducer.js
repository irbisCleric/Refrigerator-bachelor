import constants from "./../constants/action.types";

const DEFAULT_STATE = {
    productsItems: [],
    isLoading: false,
};

const productsItemsReducer = (state, action) => {
    const productsItems = action.payload;
    const res = [];

    if (!productsItems) {
        return state;
    }

    Object.keys(productsItems).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(productsItems, key)) {
            res.push(
                Object.assign(productsItems[key], { id: key }),
            );
        }
    });

    return {
        ...state,
        productsItems: [...res],
    };
};

const loaderStatus = (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading,
});

const removeItemReducer = state => ({
    ...state,
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
    case constants.FETCH_PRODUCTS:
        return productsItemsReducer(state, action);
    case constants.LOAD_STATUS_PRODUCTS:
        return loaderStatus(state, action);
    case constants.DELETE_PRODUCT:
        return removeItemReducer(state);
    default:
        return state;
    }
};
