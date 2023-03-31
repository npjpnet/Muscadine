import { useEffect, useState } from 'react'
import type { MuscadineUserDoc, MuscadineUserMeta } from 'muscadine'

import shared from '@muscadine/shared'

import useUser from '../../hooks/useUser'

import DefaultLayout from '../../components/layouts/Default/DefaultLayout'
import { Link } from 'react-router-dom'

const ManageTop: React.FC = () => {
  const { getUsers, getUserMetas } = useUser()

  const [users, setUsers] = useState<Record<string, MuscadineUserDoc>>()
  const [userMetas, setUserMetas] = useState<Record<string, MuscadineUserMeta>>()
  const [queriedUserMetas, setQueriedUserMetas] = useState<Record<string, MuscadineUserMeta>>()

  const onInitialize: () => void =
    () => {
      const fetchUsersAsync: () => Promise<void> =
        async () => {
          const fetchedUsers = await getUsers()
          setUsers(fetchedUsers)
          const fetchedUserMetas = await getUserMetas()
          setUserMetas(fetchedUserMetas)
        }
      fetchUsersAsync()
        .catch(err => {
          throw err
        })
    }
  useEffect(onInitialize, [])

  const onFetchedUserMetas: () => void =
    () => {
      if (!userMetas) return
      const sortedUserMetas = Object.entries(userMetas)
        .sort(([_a, a], [_b, b]) => Number(a.code) - Number(b.code))
        .reduce<Record<string, MuscadineUserMeta>>((p, [id, userMeta]) => ({ ...p, [id]: userMeta }), {})
      setQueriedUserMetas(sortedUserMetas)
    }
  useEffect(onFetchedUserMetas, [userMetas])

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

export default ManageTop
