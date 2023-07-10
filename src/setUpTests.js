import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/**
 * @jest-environment jsdom
 */

configure({ adapter: new Adapter() });

module.exports = {
    testTimeout: 30000
}
