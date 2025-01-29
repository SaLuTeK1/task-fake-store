import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces";
import {productsService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    products: IProduct[]
    searchProducts: IProduct[]
    searchTrigger: string
    categories: string[]
    selectedCategories:string[]
}

const initialState: IState = {
    products: [],
    searchProducts:[],
    searchTrigger:'',
    categories: [],
    selectedCategories:[],
};

const getAll = createAsyncThunk<IProduct[]>(
    'productsSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

const getAllCategories = createAsyncThunk<string[]>(
    'productsSlice/getAllCategories',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await productsService.getAllCategories()
            return data
        } catch (e) {
            const err = e as AxiosError
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
)

const productsSlice = createSlice({
    name: "productsSlice",
    initialState,
    reducers: {
        setSearchTrigger:(state,action)=>{
            state.searchTrigger = action.payload
        },
        setSelectedCategories:(state,action)=>{
            state.selectedCategories = action.payload
        },
        setSearchedProducts:(state,action)=>{
            state.searchProducts = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                    state.products = action.payload
                }
            )
            .addCase(getAllCategories.fulfilled,(state, action)=>{
                state.categories = action.payload
            })
})

const {reducer: productsReducer, actions} = productsSlice

const productsActions = {
    ...actions,
    getAll,
    getAllCategories,

}

export {productsActions, productsReducer}