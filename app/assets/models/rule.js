import {queryRule, removeRule, addRule, updateRule, queryStore, createStore, shopStatue} from '../services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      dailyList:[]
    },
  },

  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({payload, callback}, {call, put}) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({payload, callback}, {call, put}) {
      const response = yield call(removeRule, payload);
      // console.log(response)
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      // if (callback) callback();
    },
    *update({payload, callback}, {call, put}) {
      const response = yield call(updateRule, payload);
      if (callback) callback(response);
    },
    *query({payload, callback}, {call, put}){
      const response = yield call(queryStore, payload);
      if (response !== '') {
        response.map((d) => {
          d.key = d.id;
        });
      }
      yield put({
        type: 'save',
        payload: {list: response === '' ? [] : response},
      });
      if (callback) callback();
    },
    *create({payload, callback}, {call, put}){
      const response = yield call(createStore, payload);
      if (callback) callback(response);
    },
    *queryShop({payload, callback}, {call, put}){
      const response = yield call(shopStatue, payload);
      if (response !== '') {
        response.map((d) => {
          d.key = d.id;
        });
      }
      yield put({
        type: 'save',
        payload: {dailyList: response === '' ? [] : response},
      });
      if (callback) callback();
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
