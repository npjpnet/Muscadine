import { useState } from 'react'
import type { MuscadineDocumentRequest } from 'muscadine'

import useFirebase from '../../hooks/useFirebase'
import useRequestDocument from '../../hooks/useRequestDocument'

import DefaultLayout from '../../components/layouts/Default/DefaultLayout'
import FormButton from '../../components/form/FormButton'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormRadio from '../../components/form/FormRadio'
import FormSection from '../../components/form/FormSection'
import FormTextarea from '../../components/form/FormTextarea'

const requestTypes = [
  {
    value: 'business-card',
    text: '名刺'
  },
  {
    value: 'id-card',
    text: 'メンバーIDカード'
  }
]
const requestReasons = [
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

const RequestDocument: React.FC = () => {
  const { user } = useFirebase()
  const { createDocumentRequest } = useRequestDocument()

  const [request, setRequest] = useState<MuscadineDocumentRequest>({
    type: '',
    reason: '',
    remarks: ''
  })

  const handleSubmit: () => void =
    () => {
      if (!user) return
      createDocumentRequest(user.uid, request)
        .then((requestId) => alert(requestId))
        .catch(err => {
          throw err
        })
    }

  return (
    <DefaultLayout>
      <h1>書類発行申請</h1>
      <p>
        名刺, メンバーIDカード等の書類の発行申請を行えます。
      </p>
      <FormSection>
        <FormItem>
          <FormLabel>申請書類</FormLabel>
          <FormRadio
            name="type"
            values={requestTypes}
            value={request.type}
            onChange={(type) => setRequest(s => ({ ...s, type }))} />
        </FormItem>
        <FormItem>
          <FormLabel>申請理由</FormLabel>
          <FormRadio
            name="reason"
            values={requestReasons}
            value={request.reason}
            onChange={(reason) => setRequest(s => ({ ...s, reason }))} />
        </FormItem>
        <FormItem>
          <FormLabel>備考</FormLabel>
          <FormTextarea value={request.remarks} onChange={e => setRequest(s => ({ ...s, remarks: e.target.value }))} />
        </FormItem>
      </FormSection>
      <FormSection>
        <FormItem>
          <FormButton onClick={handleSubmit}>内容確認</FormButton>
        </FormItem>
      </FormSection>
    </DefaultLayout>
  )
}

export default RequestDocument
