import type { MuscadineDocumentRequest } from 'muscadine'

import useFirebase from '../../../hooks/useFirebase'
import useRequestDocument from '../../../hooks/useRequestDocument'

import DefaultLayout from '../../../components/layouts/Default/DefaultLayout'
import StepContainer from './StepContainer'

const RequestDocument: React.FC = () => {
  const { user } = useFirebase()
  const { createDocumentRequest } = useRequestDocument()

  const handleSubmit: (request: MuscadineDocumentRequest) => Promise<string | undefined> =
    async (request) => {
      if (!user) return
      const requestId = await createDocumentRequest(user.uid, request)
        .catch(err => {
          throw err
        })
      return requestId
    }

  return (
    <DefaultLayout>
      <StepContainer submit={handleSubmit} />
    </DefaultLayout>
  )
}

export default RequestDocument
