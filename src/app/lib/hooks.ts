import { useDispatch, useSelector, useStore } from 'react-redux'
import { RootState, AppDispatch, AppStore } from './store'

//use throughout apps instead of plain 'useDispatch' and 'useSelector' hooks. (I guess this is a custom hook?)
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()