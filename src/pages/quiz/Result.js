import { useSearchParams } from 'react-router-dom'
import { Layout, Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import ValueCard from '../../components/ValueCard'
import IDEOLOGIES from '../../utils/ideologies'

import Balance from '../../assets/Balance.svg'
import DollarSign from '../../assets/DollarSign.svg'
import RecyclingSymbol from '../../assets/RecyclingSymbol.svg'
import Factory from '../../assets/Factory.svg'
import Liberty from '../../assets/Liberty.svg'
import Crown from '../../assets/Crown.svg'
import RainbowFlag from '../../assets/RainbowFlag.svg'
import Family from '../../assets/Family.svg'
import FlagOfTWIndependence from '../../assets/FlagOfTWIndependence.svg'
import ChinaTerritory from '../../assets/ChinaTerritory.svg'
import FlagOfUSA from '../../assets/FlagOfUSA.svg'
import FlagOfPRC from '../../assets/FlagOfPRC.svg'

const { Title } = Typography

const Result = () => {

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  // eslint-disable-next-line no-unused-vars
  const [t, i18n] = useTranslation()

  const economic = searchParams.get('economic')
  const environmental = searchParams.get('environmental')
  const civil = searchParams.get('civil')
  const societal = searchParams.get('societal')
  const diplomatic = searchParams.get('diplomatic')
  const sovereignty = searchParams.get('sovereignty')
  const us_china_relation = searchParams.get('us_china_relation')

  const getIdeologyName = () => {
    const ideologies = IDEOLOGIES.map((value) => {
      let distance = 0.0
      distance += Math.pow(Math.abs(value.state.economic - economic), 2)
      // distance += Math.pow(Math.abs(value.state.environmental - environmental), 2)
      distance += Math.pow(Math.abs(value.state.civil - civil), 2)
      distance += Math.pow(Math.abs(value.state.societal - societal), 2)
      distance += Math.pow(Math.abs(value.state.diplomatic - diplomatic), 2)
      return {
        id: value.id,
        distance: distance
      }
    }).sort((lhs, rhs) => lhs.distance < rhs.distance ? -1 : lhs.distance > rhs.distance ? 1 : 0)

    return t(`quiz.result.ideologies.${ideologies[0].id}.name`)
  }

  const getCategory = (percent) => {
    const threshold = [0, 10, 25, 40, 60, 75, 90]
    let index = threshold.length - 1
    while (index >= 0) {
      if ((100.0 - percent) >= threshold[index]) {
        return index
      }
      --index
    }

    return 0
  }

  return (
    <Layout style={{
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Card
        title={t('quiz.result.ideologies.match')}
        headStyle={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: 'x-large',
          textAlign: 'center',
        }}
        style={{
          backgroundColor: 'white',
          width: '100%',
          fontSize: 'large',
          margin: '5px 10px 5px 10px',
        }}>
        <Title level={1} style={{ margin: '10px', color: 'black', textAlign: 'center' }}>
          {getIdeologyName()}
        </Title>
      </Card>
      <ValueCard
        title={t('quiz.result.axes.economic.title')}
        leftTitle={t('quiz.result.axes.economic.equality')}
        rightTitle={t('quiz.result.axes.economic.market')}
        leftImage={Balance}
        rightImage={DollarSign}
        leftColor='crimson'
        rightColor='turquoise'
        percent={economic}
        leaningsTitle={t(`quiz.result.axes.economic.categories.${getCategory(economic)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.environmental.title')}
        leftTitle={t('quiz.result.axes.environmental.ecology')}
        rightTitle={t('quiz.result.axes.environmental.production')}
        leftImage={RecyclingSymbol}
        rightImage={Factory}
        leftColor='forestgreen'
        rightColor='dodgerblue'
        percent={environmental}
        leaningsTitle={t(`quiz.result.axes.environmental.categories.${getCategory(environmental)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.civil.title')}
        leftTitle={t('quiz.result.axes.civil.liberty')}
        rightTitle={t('quiz.result.axes.civil.authority')}
        leftImage={Liberty}
        rightImage={Crown}
        leftColor='gold'
        rightColor='red'
        percent={civil}
        leaningsTitle={t(`quiz.result.axes.civil.categories.${getCategory(civil)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.societal.title')}
        leftTitle={t('quiz.result.axes.societal.progress')}
        rightTitle={t('quiz.result.axes.societal.tradition')}
        leftImage={RainbowFlag}
        rightImage={Family}
        leftColor='magenta'
        rightColor='brown'
        percent={societal}
        leaningsTitle={t(`quiz.result.axes.societal.categories.${getCategory(societal)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.sovereignty.title')}
        leftTitle={t('quiz.result.axes.sovereignty.independence')}
        rightTitle={t('quiz.result.axes.sovereignty.unification')}
        leftImage={FlagOfTWIndependence}
        rightImage={ChinaTerritory}
        leftColor='green'
        rightColor='black'
        percent={sovereignty}
        leaningsTitle={t(`quiz.result.axes.sovereignty.categories.${getCategory(sovereignty)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.us_china_relation.title')}
        leftTitle={t('quiz.result.axes.us_china_relation.pro_american')}
        rightTitle={t('quiz.result.axes.us_china_relation.pro_chinese')}
        leftImage={FlagOfUSA}
        rightImage={FlagOfPRC}
        leftColor='navy'
        rightColor='red'
        percent={us_china_relation}
        leaningsTitle={t(`quiz.result.axes.us_china_relation.categories.${getCategory(us_china_relation)}`)}
      />
    </Layout>
  )
}

export default Result
