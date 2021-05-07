import '@testing-library/jest-dom'
import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types'

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {

        const action = {}
        const state = authReducer(initialState, action)

        expect( state ).toEqual(initialState)
        
    })

    test('Debe de autenticar el usuario', () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Adrian'
            }
        }        

        const state = authReducer( initialState, action )
        expect(state).toEqual({ checking: false, uid: '123', name: 'Adrian' })
    })
    
    
})
