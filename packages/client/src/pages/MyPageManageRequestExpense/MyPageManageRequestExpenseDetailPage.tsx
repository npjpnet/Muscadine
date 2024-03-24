import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useExpense from '../../hooks/useExpense'
import useFirebase from '../../hooks/useFirebase'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import { getStatusText } from '../MyPageManageRequestDocuments/MyPageManageRequestDocumentsListPage'
import type { MuscadineExpenseDoc } from 'muscadine'

const MyPageManageRequestExpenseDetailPage: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>()
  const { user } = useFirebase()
  const { getExpenseByIdAsync, getReceiptURLAsync } = useExpense()
  const [expense, setExpense] = useState<MuscadineExpenseDoc>()
  const [receiptURL, setReceiptURL] = useState<string>()

  useEffect(() => {
    const fetchAsync = async (): Promise<void> => {
      if (!requestId || !user) return

      const fetchedExpense = await getExpenseByIdAsync(requestId)
      setExpense(fetchedExpense)

      if (!fetchedExpense.id) return
      const fetchedReceiptURL = await getReceiptURLAsync(fetchedExpense.id)
      setReceiptURL(fetchedReceiptURL)
    }

    fetchAsync()
      .catch(err => { throw err })
  }, [requestId, user])

  return (
    <DefaultLayout>
      <h1>経費申請照会</h1>
      <Layout>
        <Column>
          <h2>申請情報</h2>
          <table>
            <tbody>
              <tr>
                <th>申請ID</th>
                <td>{requestId}</td>
              </tr>
              <tr>
                <th>申請ステータス</th>
                <td>{expense?.status !== undefined && getStatusText(expense.status)}</td>
              </tr>
              <tr>
                <th>イベント名・用途</th>
                <td>{expense?.purpose}</td>
              </tr>
              <tr>
                <th>店舗名</th>
                <td>{expense?.store.name}</td>
              </tr>
              <tr>
                <th>摘要</th>
                <td>{expense?.remarks}</td>
              </tr>
              <tr>
                <th>経費申請額</th>
                <td>{expense?.price.toLocaleString()}円</td>
              </tr>
            </tbody>
          </table>
        </Column>
        <Column>
          <h2>レシート画像</h2>
          <a href={receiptURL} target="_blank" rel="noreferrer"><ReceiptImage src={receiptURL} /></a>
        </Column>
      </Layout>
    </DefaultLayout>
  )
}

export default MyPageManageRequestExpenseDetailPage

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
  }
`
const Column = styled.section``
const ReceiptImage = styled.img`
  width: 100%;
`
