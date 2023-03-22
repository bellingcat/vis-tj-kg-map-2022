
import { ru } from 'vuetify/locale'
import config from "../../config"

const villageProps = ["name", "description"]

export default {
  ...ru,
  $vuetify: {
    badge: ""
  },
  impact: {
    all: { name: "все" }
  },
  options: {
    title: `действия`
  },
  satellite: {
    compareText: `Сравнение спутниковых снимков между
    <strong>{before}</strong>
    и
    <strong>{after}</strong>
    показывает часть разрушения.`
  },
  villages: {
    ...Object.fromEntries(config.villages.map(v => {
      return [
        v.id,
        Object.fromEntries(villageProps.map(p => {
          return [p, v[`${p}_ru`]]
        }))
      ]
    }))
  }
};
