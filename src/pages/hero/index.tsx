import { FC, useCallback, useState, useEffect } from 'react';
import { connect, HeroModelState, ConnectProps } from 'umi';
import classnames from 'classnames';
import { Row, Col, Avatar, Radio, Card } from 'antd';
import styles from './index.less';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  getDetail: Function;
  getFreeHero: Function;
}
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
  { key: -1, value: '周免' },
];
const Hero: FC<PageProps> = (props) => {
  const [nowType, setNowType] = useState(0);
  const [hoverHero, setHoverHero] = useState(0);
  const [normalLayout, setNormalLayout] = useState(true);
  const {
    hero: { heroDetail, heroList, freeHero },
    history: { push },
  } = props;
  console.log(freeHero);
  const [showHero, setShowHero] = useState(heroList);
  const chooseHero = useCallback((clickId) => {
    return () => {
      push('/hero/' + clickId);
    };
  }, []);
  const changeType = useCallback(
    ({ target }) => {
      if (target.value === -1) {
        setNormalLayout(false);
        setShowHero(freeHero);
        setHoverHero(freeHero[0].ename);
      } else if (target.value) {
        setNormalLayout(true);
        setShowHero(
          heroList.filter((item) => {
            return item.hero_type === target.value;
          }),
        );
      } else {
        setShowHero(heroList);
        setNormalLayout(true);
      }
      setNowType(target.value);
    },
    [freeHero],
  );
  const changeActiveFreeHero = useCallback((id) => {
    return () => {
      setHoverHero(id);
    };
  }, []);
  useEffect(() => {
    setShowHero(heroList);
  }, [heroList]);
  return (
    <>
      <Radio.Group
        onChange={changeType}
        value={nowType}
        className={styles.radiosWrap}
      >
        {heroType.map((item) => {
          return (
            <Radio value={item.key} key={item.key}>
              {item.value}
            </Radio>
          );
        })}
      </Radio.Group>
      {normalLayout ? (
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          {showHero.map((item) => {
            return (
              <Col
                key={item.ename}
                span={2}
                style={{
                  width: heroDetail.cname === item.cname ? '80px' : '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  className={styles.avatarWrap}
                  onClick={chooseHero(item.ename)}
                >
                  <Avatar
                    shape="square"
                    src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
                <div>{item.cname}</div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div className={styles.banner}>
          <Card title="周免英雄" bordered={false} className={styles.freeCon}>
            <Row>
              {freeHero.map((item) => {
                return (
                  <Col
                    span={hoverHero === item.ename ? 6 : 2}
                    key={item.ename}
                    className={classnames({
                      [styles.onhero]: true,
                      [styles.activeHero]: hoverHero === item.ename,
                    })}
                  >
                    {hoverHero === item.ename ? (
                      <img
                        src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}-freehover.png`}
                        alt=" "
                        onMouseOver={changeActiveFreeHero(item.ename)}
                      />
                    ) : (
                      <img
                        src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
                        alt=" "
                        onMouseOver={changeActiveFreeHero(item.ename)}
                      />
                    )}
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
      )}
    </>
  );
};
//将hero从state中解构出来，并且规定hero的类型为HeroModelState
export default connect(
  ({ hero }: { hero: HeroModelState }) => ({ hero }),
  (dispatch) => ({
    getDetail(id: number) {
      dispatch({
        type: 'hero/getHeroDetail',
        payload: id,
      });
    },
    getFreeHero() {
      dispatch({
        type: 'hero/getFreeHero',
      });
    },
  }),
)(Hero);
