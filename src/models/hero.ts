import { Effect, Reducer, Subscription, request } from 'umi';

export interface HeroModelState {
  heroName: string;
  heroDetail: HeroModelDetail;
  heroList: Array<HeroModelList>;
}

export interface HeroModelDetail {
  ename: number;
  cname: string;
  title: string;
  skin_name: string;
}

export interface HeroModelList {
  ename: number;
  cname: string;
  title: string;
  skin_name: string;
  hero_type: number;
  new_type: number;
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
    heroName: '测试hero名称',
    heroDetail: {
      ename: 0,
      cname: '',
      title: '',
      skin_name: '',
    },
    heroList: [],
  },

  effects: {
    *query(action, { call, put }) {
      const data = yield request('/web201605/js/herolist.json');
      yield put({
        type: 'save',
        payload: data.reverse(),
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
        heroList: action.payload,
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
          });
        }
      });
    },
  },
};

export default HeroModel;
