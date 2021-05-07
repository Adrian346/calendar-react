import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2';

import '@testing-library/jest-dom'

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))


const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )

const initState = {}
const store = mockStore(initState)

store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen/>
    </Provider>
)


describe('Pruebas en LoginScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Debe de mostrarse correctamente', () => {
         expect(wrapper).toMatchSnapshot()        
    })

    test('Debe de llamar el dispatch del login', () => {
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'primo2@gmail.com'
            } 
        })        

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        })  

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })
        expect( startLogin ).toHaveBeenCalledWith('primo2@gmail.com', '123456')
    })

    test('No hay registro si las contraseñas no son iguales', () => {
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '1234567'
            }
        }) 
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })
        expect( startRegister ).not.toHaveBeenCalled()
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben de ser iguales', 'error')
    })

    test('Registro con contraseñas iguales', () => {
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        }) 
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        })
        expect( startRegister ).toHaveBeenCalledWith('Primo', 'primo@gmail.com', '123456')
    })
    
    
    
    
    
})
