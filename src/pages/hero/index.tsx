import { FC, useCallback, useState, useEffect } from 'react';
import { connect, HeroModelState, ConnectProps } from 'umi';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  test: Function;
  getDetail: Function;
  firstGet: Function;
}

const Hero: FC<PageProps> = (props) => {
  const [heroId, setHeroId] = useState(0);
  const {
    hero: { heroDetail, heroList },
  } = props;
  const getDetail = useCallback(() => {
    props.getDetail(heroId);
  }, [heroId]);
  const inputHandler = useCallback((e) => {
    setHeroId(e.target.value);
  }, []);
  useEffect(() => {
    if (!heroDetail.ename) {
      props.firstGet();
      setHeroId(105);
    } else {
      setHeroId(heroDetail.ename);
    }
  }, [heroList]);
  return (
    <div>
      <h1>Page hero</h1>
      <h2>This is {props.hero.heroName}</h2>
      <div>
        <span>name:---</span>
        {heroDetail.cname || 'none'}
      </div>
      <div>
        <span>title:---</span>
        {heroDetail.title || 'none'}
      </div>
      <div>
        <span>skin:---</span>
        {heroDetail.skin_name || 'none'}
      </div>
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {heroList.map((item) => {
          return (
            <div
              key={item.ename}
              style={{
                width: heroDetail.cname === item.cname ? '80px' : '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={`https://game.gtimg.cn/images/yxzj/img20160/heroimg/${item.ename}/${item.ename}.jpg`}
                style={
                  heroDetail.cname === item.cname
                    ? { width: '80px', height: '80px' }
                    : { width: '40px', height: '40px' }
                }
              />
              <div>{item.ename}</div>
            </div>
          );
        })}
      </div>
      <input type="text" value={heroId} onChange={inputHandler} />
      <button onClick={getDetail}>getDetail</button>
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
    getDetail(id: number) {
      dispatch({
        type: 'hero/getHeroDetail',
        payload: id,
      });
    },
    firstGet() {
      dispatch({
        type: 'hero/getHeroDetail',
        payload: 105,
      });
    },
  }),
)(Hero);
