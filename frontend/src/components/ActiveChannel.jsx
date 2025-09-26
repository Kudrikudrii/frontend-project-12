import { useTranslation } from 'react-i18next'

const ActiveChannel = ({ channelName, messagesCount }) => {
  const { t } = useTranslation()

  const getPluralForm = (count) => {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'messagesCount_0'
    }

    if (lastDigit >= 2
      && lastDigit <= 4
      && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
      return 'messagesCount_1'
    }

    return 'messagesCount_2'
  }

  const pluralKey = getPluralForm(messagesCount)

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {' '}
          {channelName}
        </b>
      </p>
      <span className="text-muted">
        {t(`chat.${pluralKey}`, { count: messagesCount })}
      </span>
    </div>
  )
}

export default ActiveChannel
