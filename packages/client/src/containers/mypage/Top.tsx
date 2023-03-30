import styled from 'styled-components'
import DefaultLayout from '../../components/layouts/Default/DefaultLayout'

const MyPageTop: React.FC = () => {
  return (
    <DefaultLayout>
      <h1>登録情報表示</h1>
      <p>
        N-Pointに登録している情報を表示しています。
      </p>

      <Layout>
        <Column>

          <h2>基本情報</h2>
          <table>
            <tbody>
              <tr>
                <th>登録名</th>
                <td>染宮ねいろ</td>
              </tr>
              <tr>
                <th>登録名(よみ)</th>
                <td>そめみやねいろ</td>
              </tr>
              <tr>
                <th>登録名(英語表記)</th>
                <td>SOMEMIYA Neiro</td>
              </tr>
              <tr>
                <th>Discordユーザ名</th>
                <td>あいうえお#1234</td>
              </tr>
            </tbody>
          </table>

          <h2>個人情報</h2>
          <table>
            <tbody>
              <tr>
                <th>氏名</th>
                <td>加藤 ありす</td>
              </tr>
              <tr>
                <th>氏名(よみ)</th>
                <td>かとう ありす</td>
              </tr>
              <tr>
                <th>個人メールアドレス</th>
                <td>example@example.com</td>
              </tr>
              <tr>
                <th>電話番号</th>
                <td>00000000000</td>
              </tr>
              <tr>
                <th>郵便番号</th>
                <td>〒100-0001</td>
              </tr>
              <tr>
                <th>住所</th>
                <td>東京都千代田区千代田1-1</td>
              </tr>
              <tr>
                <th>メンバーコード</th>
                <td>1002</td>
              </tr>
              <tr>
                <th>メンバーID</th>
                <td>2</td>
              </tr>
            </tbody>
          </table>

        </Column>

        <Column>

          <h2>所属情報</h2>
          <table>
            <tbody>
              <tr>
                <th>親所属</th>
                <td>総務部</td>
              </tr>
              <tr>
                <th>子所属</th>
                <td>幹部</td>
              </tr>
              <tr>
                <th>補職</th>
                <td>副代表</td>
              </tr>
            </tbody>
          </table>

          <h2>メンバーIDカード発行情報</h2>
          <table>
            <tbody>
              <tr>
                <th>メンバーIDカードNo.</th>
                <td>2022100202</td>
              </tr>
              <tr>
                <th>表示名</th>
                <td>登録名(染宮ねいろ)</td>
              </tr>
              <tr>
                <th>顔出し可？</th>
                <td>はい</td>
              </tr>
            </tbody>
          </table>

          <h2>登録システム情報</h2>
          <table>
            <tbody>
              <tr>
                <th>メール</th>
                <td>ts@n-point.net</td>
              </tr>
              <tr>
                <th>Redmine</th>
                <td>10mocy</td>
              </tr>
              <tr>
                <th>えなれっじ</th>
                <td>ts@n-point.net</td>
              </tr>
              <tr>
                <th>N-Memkan</th>
                <td>ts@n-point.net</td>
              </tr>
              <tr>
                <th>なんらか</th>
                <td>未登録</td>
              </tr>
            </tbody>
          </table>

        </Column>
      </Layout>

    </DefaultLayout>
  )
}

export default MyPageTop

const Layout = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`
const Column = styled.section``
