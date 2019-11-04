import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import store from '../../ReduxStore';
import Login from './index';

enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
    it('should render my component', () => {
        const component = shallow(<Login store={store} />);
        expect(component.getElements()).toMatchSnapshot();
    });
});
