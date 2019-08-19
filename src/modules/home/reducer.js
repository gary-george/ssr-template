import { HOME_TEST_TYPE } from './actions';

const initialState = {
  data: 'default CSR data',
};

const reducer = {
  [HOME_TEST_TYPE]: (state, { data }) => ({
    ...state,
    data,
  }),
};

export const homeReducer = (state = initialState, action = {}) =>
  reducer[action.type] ? reducer[action.type](state, action) : state;
