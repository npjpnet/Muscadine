import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import FormButton from '../../../components/form/FormButton'
import FormInput from '../../../components/form/FormInput'
import FormItem from '../../../components/form/FormItem'
import FormLabel from '../../../components/form/FormLabel'
import FormSection from '../../../components/form/FormSection'
import FormTextarea from '../../../components/form/FormTextarea'
import useFile from '../../../hooks/useFile'
import type { MuscadineExpense } from 'muscadine'

interface Props {
  expense: MuscadineExpense | undefined
  receiptFile: File | undefined
  nextStep: (expense: MuscadineExpense, receiptData: string, receiptFile: File) => void
}
const InputStep: React.FC<Props> = (props) => {
  const {
    data: receiptDataWithHook,
    openAsDataURL: openReceipt
  } = useFile()

  const [expense, setExpense] = useState({
    purpose: '',
    store: {
      name: ''
    },
    remarks: '',
    price: ''
  })
  const [receiptData, setReceiptData] = useState<string>()
  const [receiptFile, setReceiptFile] = useState<File>()

  const handleConfirm = useCallback(() => {
    if (!receiptData || !receiptFile) return

    const sanitizedExpense: MuscadineExpense = {
      ...expense,
      price: Number(expense.price)
    }
    props.nextStep(sanitizedExpense, receiptData, receiptFile)
  }, [expense, receiptData, receiptFile])

  useEffect(() => {
    if (props.expense) {
      const fetchedExpense = {
        ...props.expense,
        price: props.expense.price.toString()
      }
      setExpense(fetchedExpense)
    }
    if (props.receiptFile) {
      setReceiptFile(props.receiptFile)
    }
  }, [props.expense, props.receiptFile])

  useEffect(() => {
    if (!receiptFile) return
    openReceipt(receiptFile)
  }, [receiptFile])

  useEffect(() => {
    if (!receiptDataWithHook) return
    setReceiptData(receiptDataWithHook)
  }, [receiptDataWithHook])

  return (
    <>
      <h2>申請情報入力</h2>

      <p>
        経費申請プロセスは「<a href="" target="_blank">経費申請プロセスについて(えなれっじ)</a>」をご確認ください。
      </p>

      <FormSection>
        <FormItem>
          <FormLabel>レシート画像</FormLabel>
          <FormInput
            type="file"
            accept="image/*"
            onChange={e => setReceiptFile(e.target.files?.[0])}/>
        </FormItem>
        <FormItem>
          {receiptData && <ReceiptImage src={receiptData} />}
        </FormItem>
        <FormItem>
          <FormLabel>イベント名・用途</FormLabel>
          <FormInput
            value={expense.purpose}
            onChange={e => setExpense(s => ({ ...s, purpose: e.target.value }))}/>
        </FormItem>
        <FormItem>
          <FormLabel>店舗名</FormLabel>
          <FormInput
            value={expense.store.name}
            onChange={e => setExpense(s => ({ ...s, store: { ...s.store, name: e.target.value } }))}/>
        </FormItem>
        <FormItem>
          <FormLabel>摘要</FormLabel>
          <FormTextarea
            value={expense.remarks}
            onChange={e => setExpense(s => ({ ...s, remarks: e.target.value }))}/>
        </FormItem>
        <FormItem>
          <FormLabel>経費申請額</FormLabel>
          <FormInput
            type="number"
            value={expense.price}
            onChange={e => setExpense(s => ({ ...s, price: e.target.value }))}/>
        </FormItem>
      </FormSection>
      <FormSection>
        <FormItem>
          <FormButton onClick={handleConfirm}>内容確認</FormButton>
        </FormItem>
      </FormSection>
    </>
  )
}

export default InputStep

const ReceiptImage = styled.img`
  width: 100%;
`
