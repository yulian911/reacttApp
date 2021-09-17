import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {RootState} from '../../store/redux/rootReducer'

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
