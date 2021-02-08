import { FC, useCallback, useState, useEffect } from 'react';
import { connect, HeroModelState, ConnectProps } from 'umi';
import classnames from 'classnames';
import { Row, Col, Avatar, Radio, Card } from 'antd';
import styles from './index.less';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  getDetail: Function;
  getFreeHero: Function;
  changeType: Function;
}
const heroType = [
  { key: '', value: '全部' },
  { key: 'fighter', value: '战士' },
  { key: 'mage', value: '法师' },
  { key: 'tank', value: '坦克' },
  { key: 'assassin', value: '刺客' },
  { key: 'marksman', value: '射手' },
  { key: 'support', value: '辅助' },
  { key: 'free', value: '周免' },
];
const Hero: FC<PageProps> = (props) => {
  const [hoverHero, setHoverHero] = useState(0);
  const [normalLayout, setNormalLayout] = useState(true);
  const {
    hero: { heroDetail, heroList, freeHero, nowType },
    history: { push },
  } = props;
  const [showHero, setShowHero] = useState(heroList);
  const chooseHero = useCallback((clickId) => {
    return () => {
      push('/hero/detail?id=' + clickId);
    };
  }, []);
  const changeType = useCallback(
    ({ target }) => {
      if (target.value === 'free') {
        setNormalLayout(false);
        setShowHero(freeHero);
        setHoverHero(freeHero[0].heroId);
      } else if (target.value) {
        setNormalLayout(true);
        setShowHero(
          heroList.filter((item) => {
            return item.roles.includes(target.value);
          }),
        );
      } else {
        setShowHero(heroList);
        setNormalLayout(true);
      }
      props.changeType(target.value);
    },
    [freeHero],
  );
  const changeActiveFreeHero = useCallback((id) => {
    return () => {
      setHoverHero(id);
    };
  }, []);
  useEffect(() => {
    if (!nowType) {
      setShowHero(heroList);
    } else {
      changeType({ target: { value: nowType } });
    }
    if (nowType === 'free') {
      setNormalLayout(false);
    }
  }, [heroList, nowType]);
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
                key={item.heroId}
                span={2}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <div
                  className={styles.avatarWrap}
                  onClick={chooseHero(item.heroId)}
                >
                  <Avatar
                    shape="square"
                    src={`http://game.gtimg.cn/images/lol/act/img/champion/${item.alias}.png`}
                    style={{ width: '60px', height: '60px' }}
                  />
                </div>
                <div>{item.name}</div>
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
                    span={hoverHero === item.heroId ? 6 : 2}
                    key={item.heroId}
                    className={classnames({
                      [styles.onhero]: true,
                      [styles.activeHero]: hoverHero === item.heroId,
                    })}
                    onClick={chooseHero(item.heroId)}
                  >
                    {hoverHero === item.heroId ? (
                      <img
                        src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.heroId}/${item.heroId}-freehover.png`}
                        alt=" "
                        onMouseOver={changeActiveFreeHero(item.heroId)}
                      />
                    ) : (
                      <img
                        src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.heroId}/${item.heroId}.jpg`}
                        alt=" "
                        onMouseOver={changeActiveFreeHero(item.heroId)}
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
    changeType(type: number) {
      dispatch({
        type: 'hero/changeType',
        payload: type,
      });
    },
  }),
)(Hero);
