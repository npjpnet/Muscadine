import { useCallback, useState } from 'react'
import styled from 'styled-components'
import FormButton from '../../../components/form/FormButton'
import FormItem from '../../../components/form/FormItem'
import FormSection from '../../../components/form/FormSection'
import type { MuscadineExpense } from 'muscadine'

interface Props {
  expense: MuscadineExpense | undefined
  receiptData: string | undefined
  prevStep: () => void
  nextStep: () => Promise<void>
}
const ConfirmStep: React.FC<Props> = (props) => {
  const [isProgress, setProgress] = useState(false)

  const handleSubmit = useCallback(() => {
    setProgress(true)
    props.nextStep()
      .catch(err => {
        console.error(err)
        setProgress(false)
      })
  }, [props.nextStep])

  return (
    <>
      <h2>入力内容確認</h2>

      <Layout>
        <Column>
          <h3>申請内容</h3>
          <table>
            <tbody>
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

      <FormSection>
        <FormItem>
          <FormButton onClick={handleSubmit} disabled={isProgress}>申請する</FormButton>
          <FormButton color="default" onClick={props.prevStep} disabled={isProgress}>修正する</FormButton>
        </FormItem>
      </FormSection>
    </>
  )
}

export default ConfirmStep

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
