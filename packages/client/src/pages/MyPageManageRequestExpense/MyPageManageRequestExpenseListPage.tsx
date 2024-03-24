import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useExpense from '../../hooks/useExpense'
import useUser from '../../hooks/useUser'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import { getStatusText } from '../MyPageManageRequestDocuments/MyPageManageRequestDocumentsListPage'
import type { MuscadineExpenseDoc, MuscadineUserDoc } from 'muscadine'

const MyPageManageRequestExpenseListPage: React.FC = () => {
  const { getExpensesAsync } = useExpense()
  const { getUserByIdAsync } = useUser()

  const [expenses, setExpenses] = useState<MuscadineExpenseDoc[]>()
  const [users, setUsers] = useState<Record<string, MuscadineUserDoc>>()

  useEffect(() => {
    const fetchExpensesAsync = async (): Promise<void> => {
      const expenses = await getExpensesAsync()
      setExpenses(expenses)

      const users = await Promise.all(expenses.map(async e => ({
        id: e.userId,
        data: await getUserByIdAsync(e.userId)
      })))
        .then(fetchedUsers => fetchedUsers.reduce<Record<string, MuscadineUserDoc>>((p, c) => ({ ...p, [c.id]: c.data }), {}))
        .catch(err => { throw err })
      setUsers(users)
    }
    fetchExpensesAsync()
      .catch(err => { throw err })
  }, [])

  return (
    <DefaultLayout>
      <h1>経費申請一覧</h1>
      <p>
        経費申請の一覧を表示しています。
      </p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>申請元</th>
            <th>状態</th>
            <th>申請日時</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            ?.sort((a, b) => (b.createdAt?.getTime() ?? 9) - (a.createdAt?.getTime() ?? 0))
            .map(e => <tr key={e.id}>
              <td><Link to={`/manage/request-expenses/${e.id}`}>{e.id}</Link></td>
              <td>{users?.[e.userId].name}</td>
              <td>{e.status !== undefined && getStatusText(e.status)}</td>
              <td>{e.createdAt?.toLocaleString()}</td>
            </tr>)}
        </tbody>
      </table>
    </DefaultLayout>
  )
}

export default MyPageManageRequestExpenseListPage
