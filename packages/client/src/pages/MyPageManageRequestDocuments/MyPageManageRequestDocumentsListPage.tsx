import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useRequestDocument from '../../hooks/useRequestDocument'
import useUser from '../../hooks/useUser'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import { getTypeTextByValue } from '../MyPageRequestDocuments/StepContainer/StepContainer'
import type { MuscadineRequestStatus, MuscadineDocumentRequestDoc, MuscadineUserDoc } from 'muscadine'

export const statusTexts = ['未確認', '承認', '却下', '処理済み']
export const getStatusText: (status: MuscadineRequestStatus) => string =
  (status) => statusTexts[status]

const MyPageManageRequestDocumentsListPage: React.FC = () => {
  const { getDocumentRequestsAsync } = useRequestDocument()
  const { getUserByIdAsync } = useUser()

  const [requests, setRequests] = useState<Record<string, MuscadineDocumentRequestDoc>>()
  const [queriedRequests, setQueriesStatus] = useState<Record<string, MuscadineDocumentRequestDoc>>()
  const [users, setUsers] = useState<Record<string, MuscadineUserDoc>>()

  useEffect(() => {
    const fetchDocumentRequestsAsync = async (): Promise<void> => {
      const fetchedDocumentRequests = await getDocumentRequestsAsync()
      setRequests(fetchedDocumentRequests)
      const userIds = [
        ...Object.values(fetchedDocumentRequests)
          .reduce((p, c) => p.add(c.userId), new Set<string>())
      ]
      const fetchUserTasks = userIds.map(async (userId) => await getUserByIdAsync(userId))
      const fetchedUsers = await Promise.all(fetchUserTasks)
      const mappedUsers = fetchedUsers
        .filter(user => user.userId)
        .reduce<Record<string, MuscadineUserDoc>>(
        (p, c) => {
          if (!c.userId) return { ...p }
          return { ...p, [c.userId]: c }
        }, {})
      setUsers(mappedUsers)
    }
    fetchDocumentRequestsAsync()
      .catch(err => { throw err })
  }, [])

  useEffect(() => {
    if (!requests) return
    const mappedRequests = Object.entries(requests)
      .filter(([_, request]) => request.status !== 2 && request.status !== 3)
      .sort(([_1, a], [_2, b]) => b.timestamp - a.timestamp)
      .reduce<Record<string, MuscadineDocumentRequestDoc>>((p, [id, request]) => ({ ...p, [id]: request }), {})
    setQueriesStatus(mappedRequests)
  }, [requests])

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
            <th>状態</th>
            <th>種類</th>
            <th>申請日時</th>
          </tr>
        </thead>
        <tbody>
          {queriedRequests && Object.entries(queriedRequests).map(([id, request]) => <tr key={id}>
            <td><Link to={`/manage/request-documents/${id}`}>{id}</Link></td>
            <td>{users?.[request.userId].name}</td>
            <td>{getStatusText(request.status)}</td>
            <td>{getTypeTextByValue(request.type)}</td>
            <td>{new Date(request.timestamp).toLocaleString()}</td>
          </tr>)}
        </tbody>
      </table>
    </DefaultLayout>
  )
}

export default MyPageManageRequestDocumentsListPage
