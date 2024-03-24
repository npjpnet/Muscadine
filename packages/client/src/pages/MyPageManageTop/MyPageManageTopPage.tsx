import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import shared from '@muscadine/shared'
import useUser from '../../hooks/useUser'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import type { MuscadineUserDoc, MuscadineUserMeta } from 'muscadine'

const MyPageManageTopPage: React.FC = () => {
  const { getUsersAsync, getUserMetasAsync } = useUser()

  const [users, setUsers] = useState<Record<string, MuscadineUserDoc>>()
  const [userMetas, setUserMetas] = useState<Record<string, MuscadineUserMeta>>()
  const [queriedUserMetas, setQueriedUserMetas] = useState<Record<string, MuscadineUserMeta>>()

  useEffect(() => {
    const fetchUsersAsync: () => Promise<void> =
      async () => {
        const fetchedUsers = await getUsersAsync()
        setUsers(fetchedUsers)
        const fetchedUserMetas = await getUserMetasAsync()
        setUserMetas(fetchedUserMetas)
      }
    fetchUsersAsync()
      .catch(err => {
        throw err
      })
  }, [])

  useEffect(() => {
    if (!userMetas) return
    const sortedUserMetas = Object.entries(userMetas)
      .sort(([_a, a], [_b, b]) => Number(a.code) - Number(b.code))
      .reduce<Record<string, MuscadineUserMeta>>((p, [id, userMeta]) => ({ ...p, [id]: userMeta }), {})
    setQueriedUserMetas(sortedUserMetas)
  }, [userMetas])

  return (
    <DefaultLayout requiredAccessLevel={2}>
      <h1>メンバー一覧</h1>
      <p>
        Muscadineで管理しているメンバー一覧を表示しています。
      </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>UUID</th>
            <th>登録名</th>
            <th>所属</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          {users && queriedUserMetas && Object.entries(queriedUserMetas).map(([id, userMeta]) => <tr key={id}>
            <td><Link to={`/manage/user/${id}`}>{userMeta.code}</Link></td>
            <td>{userMeta.uuid}</td>
            <td>{users[id].name}</td>
            <td>{shared.constants.mainTeam[userMeta.team.mainId]}</td>
            <td>{id}</td>
          </tr>)}
        </tbody>
      </table>
    </DefaultLayout>
  )
}

export default MyPageManageTopPage
