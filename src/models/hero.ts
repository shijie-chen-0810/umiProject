import { Effect, Reducer, Subscription, request } from 'umi';

export interface HeroModelState {
  heroName: string;
  heroDetail: HeroModelDetail;
}

export interface HeroModelDetail {
  ename: number;
  cname: string;
  title: string;
  skin_name: string;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    getHeroDetail: Effect;
  };
  reducers: {
    save: Reducer;
    changeDetail: Reducer;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    heroName: 'hero',
    heroDetail: {
      ename: 0,
      cname: '',
      title: '',
      skin_name: '',
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield request('/web201605/js/herolist.json');
      yield put({
        type: 'save',
        payload: payload,
      });
    },
    *getHeroDetail({ payload }, { call, put }) {
      const data = yield request('/getherodetailbyid?id=' + payload);
      yield put({
        type: 'changeDetail',
        payload: data,
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeDetail(state, action) {
      state.heroDetail = { ...action.payload };
      return {
        ...state,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'query',
            payload: { heroName: 'herosub' },
          });
        }
      });
    },
  },
};

export default HeroModel;
