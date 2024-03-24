import * as FirestoreDB from 'firebase/firestore'
import * as Storage from 'firebase/storage'
import { expenseConverter } from '../libs/converters'
import useFirebase from './useFirebase'
import type { MuscadineExpense, MuscadineExpenseDoc } from 'muscadine'

interface IUseExpense {
  createExpenseRequestAsync: (userId: string, expense: MuscadineExpense) => Promise<string>
  getExpensesAsync: () => Promise<MuscadineExpenseDoc[]>
  getExpenseByIdAsync: (expenseId: string) => Promise<MuscadineExpenseDoc>
  uploadReceiptAsync: (expenseId: string, receiptFile: File) => Promise<void>
  getReceiptURLAsync: (expenseId: string) => Promise<string>
}
const useExpense = (): IUseExpense => {
  const { getFirestore, getStorage } = useFirebase()

  const createExpenseRequestAsync = async (userId: string, expense: MuscadineExpense): Promise<string> => {
    const db = getFirestore()
    const expensesRef = FirestoreDB.collection(db, 'expenses')
      .withConverter(expenseConverter)

    const expenseDoc: MuscadineExpenseDoc = {
      ...expense,
      userId,
      status: 0
    }

    const addResult = await FirestoreDB.addDoc(expensesRef, expenseDoc)
      .catch(err => { throw err })

    return addResult.id
  }

  const getExpensesAsync = async (): Promise<MuscadineExpenseDoc[]> => {
    const db = getFirestore()
    const expensesRef = FirestoreDB.collection(db, 'expenses')
      .withConverter(expenseConverter)
    const expensesDocs = await FirestoreDB.getDocs(expensesRef)
    const docs = expensesDocs.docs
      .map(d => d.data())
    return docs
  }

  const getExpenseByIdAsync = async (expenseId: string): Promise<MuscadineExpenseDoc> => {
    const db = getFirestore()
    const expenseRef = FirestoreDB.doc(db, `expenses/${expenseId}`)
      .withConverter(expenseConverter)

    const expenseDoc = await FirestoreDB.getDoc(expenseRef)
    if (!expenseDoc.exists()) {
      throw new Error('expense not found')
    }

    const expense = expenseDoc.data()
    return expense
  }

  const uploadReceiptAsync = async (expenseId: string, receiptFile: File): Promise<void> => {
    const storage = getStorage()
    const receiptRef = Storage.ref(storage, `expenses/receipts/${expenseId}`)
    await Storage.uploadBytes(receiptRef, receiptFile)
      .catch(err => { throw err })
  }

  const getReceiptURLAsync = async (expenseId: string): Promise<string> => {
    const storage = getStorage()
    const receiptRef = Storage.ref(storage, `expenses/receipts/${expenseId}`)
    const url = await Storage.getDownloadURL(receiptRef)
      .catch(err => { throw err })
    return url
  }

  return {
    createExpenseRequestAsync,
    getExpensesAsync,
    getExpenseByIdAsync,
    uploadReceiptAsync,
    getReceiptURLAsync
  }
}

export default useExpense
