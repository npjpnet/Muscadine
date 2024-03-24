import { useCallback, useEffect, useState } from 'react'
import { type MuscadineExpense } from 'muscadine'
import useExpense from '../../../hooks/useExpense'
import useFirebase from '../../../hooks/useFirebase'
import ConfirmStep from './ConfirmStep'
import InputStep from './InputStep'
import SuccessStep from './SuccessStep'

const StepContainer: React.FC = () => {
  const { user } = useFirebase()
  const { createExpenseRequestAsync, uploadReceiptAsync } = useExpense()

  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState<JSX.Element[]>()

  const [expense, setExpense] = useState<MuscadineExpense>()
  const [expenseId, setExpenseId] = useState<string>()
  const [receiptData, setReceiptData] = useState<string>()
  const [receiptFile, setReceiptFile] = useState<File>()

  const handleCreateAsync = useCallback(async () => {
    console.log(expense, user, receiptFile)
    if (!expense || !user || !receiptFile) return
    const fetchedExpenseId = await createExpenseRequestAsync(user.uid, expense)
      .catch(err => { throw err })
    await uploadReceiptAsync(fetchedExpenseId, receiptFile)
      .catch(err => { throw err })
    setExpenseId(fetchedExpenseId)
    setStep(2)
  }, [expense, user, receiptFile])

  useEffect(() => {
    setSteps([
      <InputStep
        key="input"
        expense={expense}
        receiptFile={receiptFile}
        nextStep={(ex: MuscadineExpense, receiptData: string, receiptFile: File) => {
          setExpense(ex)
          setReceiptData(receiptData)
          setReceiptFile(receiptFile)
          setStep(1)
        }}/>,
      <ConfirmStep
        key="confirm"
        expense={expense}
        receiptData={receiptData}
        nextStep={handleCreateAsync}
        prevStep={() => setStep(0)} />,
      <SuccessStep
        key="success"
        expenseId={expenseId}
        expense={expense}
        receiptData={receiptData} />
    ])
  }, [expense, expenseId, receiptFile, receiptData, handleCreateAsync])

  return (
    <>
      {steps?.[step]}
    </>
  )
}

export default StepContainer
