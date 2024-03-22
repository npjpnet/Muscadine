import { useCallback } from 'react'
import DefaultLayout from '../../components/layouts/DefaultLayout/DefaultLayout'
import useFirebase from '../../hooks/useFirebase'
import useRequestDocument from '../../hooks/useRequestDocument'

import StepContainer from './StepContainer/StepContainer'
import type { MuscadineDocumentRequest } from 'muscadine'

const MyPageRequestDocumentsPage: React.FC = () => {
  const { user } = useFirebase()
  const { createDocumentRequestAsync } = useRequestDocument()

  const handleSubmit = useCallback(async (request: MuscadineDocumentRequest): Promise<string | undefined> => {
    if (!user) return
    const requestId = await createDocumentRequestAsync(user.uid, request)
      .catch(err => { throw err })
    return requestId
  }, [user])

  return (
    <DefaultLayout>
      <StepContainer submit={handleSubmit} />
    </DefaultLayout>
  )
}

export default MyPageRequestDocumentsPage
