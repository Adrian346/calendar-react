import { uiReducer } from "../../reducers/uiReducer"
import '@testing-library/jest-dom'
import { types } from "../../types/types"
import { uiCloseModal, uiOpenModal } from "../../actions/ui"

const initialState = {
    modalOpen: false
}

describe('Pruebas en uiReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        const state = uiReducer(initialState, {})
        expect( state ).toEqual(initialState)
    })

    test('Debe de abrir y cerrar el modal', () => {
        const modalOpen = uiOpenModal()
        const state = uiReducer(initialState, modalOpen)                

        expect(state).toEqual({ modalOpen: true })

        const modalClose = uiCloseModal()
        const stateClose = uiReducer(state, modalClose)

        expect(stateClose).toEqual({ modalOpen: false })
    })
    
    
    
})
