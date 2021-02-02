import { FC, useCallback } from 'react';
import { connect, HeroModelState, ConnectProps } from 'umi';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  test: Function;
}

const Hero: FC<PageProps> = (props) => {
  const changeName = useCallback(() => {
    props.test();
  }, []);
  return (
    <div>
      <h1>Page hero</h1>
      <h2>This is {props.hero.heroName}</h2>
      <button onClick={changeName}>click</button>
    </div>
  );
};
//将hero从state中解构出来，并且规定hero的类型为HeroModelState
export default connect(
  ({ hero }: { hero: HeroModelState }) => ({ hero }),
  (dispatch) => ({
    test() {
      dispatch({
        type: 'hero/query',
        payload: { heroName: 'aaaa' },
      });
    },
  }),
)(Hero);
