import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import StepContainer from './StepContainer/StepContainer'

const MyPageRequestExpensePage: React.FC = () => {
  return (
    <DefaultLayout>
      <h1>経費申請</h1>
      <StepContainer />
    </DefaultLayout>
  )
}

export default MyPageRequestExpensePage
