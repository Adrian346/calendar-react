import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {createSerializer} from 'enzyme-to-json';
import 'jest-canvas-mock'
 
 
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

// HTMLCanvasElement.prototype.getContext = () => {} //Cualquiera de los dos funciona import 'jest-canvas-mock