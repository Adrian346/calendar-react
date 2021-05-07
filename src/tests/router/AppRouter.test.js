import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import '@testing-library/jest-dom'

import { AppRouter } from '../../router/AppRouter';

// jest.mock('../../../actions/events', () => ({
//     eventStartDelete: jest.fn()
// }))

const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )

const initState = {
    auth: {
        checking: true
    }
}
const store = mockStore(initState)

// store.dispatch = jest.fn()


describe('Pruebas en AppRouter', () => {
    
    test('Debe de mostrar el espere...', () => {
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        )
        
        expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('h5').exists() ).toBe(true)
    })

    test('Debe de mostrar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        }
        const store = mockStore(initState)
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        )
        
        expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('.login-container').exists() ).toBe(true)
    })

    test('Debe de mostrar la ruta privada', () => {

        const initState = {
            ui: {
                modalOpen: false
            },
            calendar: {
                events: []
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'Adrian'
            }
        }
        const store = mockStore(initState)
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouter/>
            </Provider>
        )
        
        expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true)
    })
        
})
