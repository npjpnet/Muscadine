import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FormItem from '../../components/form/FormItem'
import FormLabel from '../../components/form/FormLabel'
import FormSection from '../../components/form/FormSection'
import FormTextarea from '../../components/form/FormTextarea'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'

const MyPageRequestExpensePage: React.FC = () => {
  return (
    <DefaultLayout>
      <h1>経費申請</h1>
      <p>
        経費申請プロセスは「<a href="" target="_blank">経費申請プロセスについて(えなれっじ)</a>」をご確認ください。
      </p>
      <FormSection>
        <FormItem>
          <FormLabel>レシート画像</FormLabel>
          <FormInput type="file" accept="image/*" />
        </FormItem>
        <FormItem>
          <FormLabel>イベント名・用途</FormLabel>
          <FormInput />
        </FormItem>
        <FormItem>
          <FormLabel>店舗名</FormLabel>
          <FormInput />
        </FormItem>
        <FormItem>
          <FormLabel>摘要</FormLabel>
          <FormTextarea />
        </FormItem>
        <FormItem>
          <FormLabel>経費申請額</FormLabel>
          <FormInput type="number" />
        </FormItem>
      </FormSection>
      <FormSection>
        <FormItem>
          <FormButton>内容確認</FormButton>
        </FormItem>
      </FormSection>
    </DefaultLayout>
  )
}

export default MyPageRequestExpensePage
