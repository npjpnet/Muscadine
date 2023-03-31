import DefaultLayout from '../../components/layouts/Default/DefaultLayout'

const ManageTop: React.FC = () => {
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
            <th>登録名</th>
            <th>所属</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1002</td>
            <td>染宮ねいろ</td>
            <td>総務部</td>
          </tr>
          <tr>
            <td>1002</td>
            <td>染宮ねいろ</td>
            <td>総務部</td>
          </tr>
          <tr>
            <td>1002</td>
            <td>染宮ねいろ</td>
            <td>総務部</td>
          </tr>
          <tr>
            <td>1002</td>
            <td>染宮ねいろ</td>
            <td>総務部</td>
          </tr>
          <tr>
            <td>1002</td>
            <td>染宮ねいろ</td>
            <td>総務部</td>
          </tr>
        </tbody>
      </table>
    </DefaultLayout>
  )
}

export default ManageTop
