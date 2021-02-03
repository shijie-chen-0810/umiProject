import { Effect, Reducer, Subscription } from 'umi';

export interface ItemModalState {
  itemName: string;
}

export interface ItemModalType {
  namespace: 'item';
  state: ItemModalState;
  effects: {
    asyncChange: Effect;
  };
  reducers: {
    syncChange: Reducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const ItemModal: ItemModalType = {
  namespace: 'item',
  state: {
    itemName: 'arrow',
  },
  effects: {
    *asyncChange(action, temp) {
      console.log(action, temp);
      yield temp.put({
        type: 'syncChange',
        payload: action.payload,
      });
    },
  },
  reducers: {
    syncChange(state, action) {
      console.log(state, action);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((temp) => {
        console.log(temp);
        if (temp.pathname === '/item') {
          dispatch({
            type: 'asyncChange',
            payload: {
              itemName: 'itemsub',
            },
          });
        }
      });
    },
  },
};

export default ItemModal;
