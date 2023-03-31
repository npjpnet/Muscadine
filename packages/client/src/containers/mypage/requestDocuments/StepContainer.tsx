import { useEffect, useState } from 'react'
import type { MuscadineDocumentRequest } from 'muscadine'

import InputComponent from './Input'
import ConfirmComponent from './Confirm'
import SuccessComponent from './Success'

export const requestTypes = [
  {
    value: 'business-card',
    text: '名刺'
  },
  {
    value: 'id-card',
    text: 'メンバーIDカード'
  }
]
export const requestReasons = [
  {
    value: 'lost',
    text: '紛失・盗難'
  },
  {
    value: 'damaged',
    text: '汚損'
  },
  {
    value: 'changed',
    text: '記載事項変更'
  },
  {
    value: 'supplement',
    text: '補充'
  }
]

export const getTypeTextByValue: (typeValue: string) => string =
  (typeValue) => {
    const type = requestTypes.filter(typeItem => typeItem.value === typeValue)
    if (type.length) return type[0].text
    return ''
  }
export const getReasonTextByValue: (reasonType: string) => string =
  (reasonType) => {
    const reason = requestReasons.filter(reasonItem => reasonItem.value === reasonType)
    if (reason.length) return reason[0].text
    return ''
  }

interface Props {
  submit: (request: MuscadineDocumentRequest) => Promise<string | undefined>
}
const StepContainer: React.FC<Props> = (props) => {
  const [Steps, setSteps] = useState<JSX.Element[]>()
  const [step, setStep] = useState(0)

  const [request, setRequest] = useState<MuscadineDocumentRequest>()
  const [requestId, setRequestId] = useState<string>()

  const handleSubmit: () => void =
    () => {
      if (!request) return
      props.submit(request)
        .then((reqId) => {
          setRequestId(reqId)
          setStep(2)
        })
        .catch(err => {
          throw err
        })
    }

  const handleInitialize: () => void =
    () => {
      setRequest(undefined)
      setRequestId(undefined)
      setStep(0)
    }

  const onInitialize: () => void =
    () => {
      setSteps([
        <InputComponent request={request} nextStep={(req) => {
          setRequest(req)
          setStep(1)
        }} />,
        <ConfirmComponent request={request} prevStep={() => setStep(0)} submit={handleSubmit} />,
        <SuccessComponent requestId={requestId} request={request} initialize={handleInitialize} />
      ])
    }
  useEffect(onInitialize, [step, request])

  return (
    <>
      <h1>書類発行申請</h1>
      <p>
        名刺, メンバーIDカード等の書類の発行申請を行えます。
      </p>
      {Steps?.[step]}
    </>
  )
}

export default StepContainer
