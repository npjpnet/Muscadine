import DefaultLayout from '../../components/layouts/Default/DefaultLayout'

const EventHistory: React.FC = () => {
  return (
    <DefaultLayout>
      <h1>イベント参加履歴</h1>
      <p>
        今までに参加したイベントの履歴を表示します。
      </p>

      <table>
        <thead>
          <tr>
            <th>イベント</th>
            <th>種別</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minecraft Coders Conference x プログラミングLT 2018</td>
            <td>スタッフ</td>
            <td>プロジェクトマネージャー</td>
          </tr>
          <tr>
            <td>Minecraft Coders Conference x プログラミングLT 2018</td>
            <td>スタッフ</td>
            <td>プロジェクトマネージャー</td>
          </tr>
          <tr>
            <td>Minecraft Coders Conference x プログラミングLT 2018</td>
            <td>スタッフ</td>
            <td>プロジェクトマネージャー</td>
          </tr>
          <tr>
            <td>Minecraft Coders Conference x プログラミングLT 2018</td>
            <td>スタッフ</td>
            <td>プロジェクトマネージャー</td>
          </tr>
          <tr>
            <td>Minecraft Coders Conference x プログラミングLT 2018</td>
            <td>スタッフ</td>
            <td>プロジェクトマネージャー</td>
          </tr>
        </tbody>
      </table>
    </DefaultLayout>
  )
}

export default EventHistory
