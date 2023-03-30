import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { type MuscadineDocumentRequestDoc } from 'muscadine'

import useRequestDocument from '../../../hooks/useRequestDocument'

import DefaultLayout from '../../../components/layouts/Default/DefaultLayout'

const ManageRequestDocument: React.FC = () => {
  const { getDocumentRequests } = useRequestDocument()

  const [requests, setRequests] = useState<Record<string, MuscadineDocumentRequestDoc>>()
  const [queriedRequests, setQueriesStatus] = useState<Record<string, MuscadineDocumentRequestDoc>>()

  const onInitialize: () => void =
    () => {
      const fetchDocumentRequestsAsync: () => Promise<void> =
        async () => {
          const fetchedDocumentRequests = await getDocumentRequests()
          setRequests(fetchedDocumentRequests)
        }
      fetchDocumentRequestsAsync()
        .catch(err => {
          throw err
        })
    }
  useEffect(onInitialize, [])

  const onFetchedRequests: () => void =
    () => {
      if (!requests) return
      const mappedRequests = Object.entries(requests)
        .sort(([_1, a], [_2, b]) => b.timestamp - a.timestamp)
        .reduce<Record<string, MuscadineDocumentRequestDoc>>((p, [id, request]) => ({ ...p, [id]: request }), {})
      setQueriesStatus(mappedRequests)
    }
  useEffect(onFetchedRequests, [requests])

  return (
    <DefaultLayout>
      <h1>書類発行申請一覧</h1>
      <p>
        書類発行申請の一覧を表示しています。
      </p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>申請元</th>
            <th>種類</th>
            <th>状態</th>
            <th>申請日時</th>
          </tr>
        </thead>
        <tbody>
          {queriedRequests && Object.entries(queriedRequests).map(([id, request]) => <tr key={id}>
            <td><Link to={`/manage/request-documents/${id}`}>{id}</Link></td>
            <td>{request.userId}</td>
            <td>{request.type}</td>
            <td>{request.status}</td>
            <td>{new Date(request.timestamp).toLocaleString()}</td>
          </tr>)}
        </tbody>
      </table>
    </DefaultLayout>
  )
}

export default ManageRequestDocument
