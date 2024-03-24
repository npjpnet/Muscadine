import styled from 'styled-components'
import type { MuscadineExpense } from 'muscadine'

interface Props {
  expenseId: string | undefined
  expense: MuscadineExpense | undefined
  receiptData: string | undefined
}
const SuccessStep: React.FC<Props> = (props) => {
  return (
    <>
      <h2>経費申請が完了しました</h2>

      <Layout>
        <Column>
          <h3>申請内容</h3>
          <table>
            <tbody>
              <tr>
                <th>申請ID</th>
                <td>{props?.expenseId}</td>
              </tr>
              <tr>
                <th>イベント名・用途</th>
                <td>{props.expense?.purpose}</td>
              </tr>
              <tr>
                <th>店舗名</th>
                <td>{props.expense?.store.name}</td>
              </tr>
              <tr>
                <th>摘要</th>
                <td>{props.expense?.remarks}</td>
              </tr>
              <tr>
                <th>経費申請額</th>
                <td>{props.expense?.price.toLocaleString()}円</td>
              </tr>
            </tbody>
          </table>
        </Column>
        <Column>
          <h3>レシート画像</h3>
          <ReceiptImage src={props.receiptData} />
        </Column>
      </Layout>
    </>
  )
}

export default SuccessStep

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 840px) {
    grid-template-columns: auto;
  }
`
const Column = styled.section``

const ReceiptImage = styled.img`
  width: 100%;
`
