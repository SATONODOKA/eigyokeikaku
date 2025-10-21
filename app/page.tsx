"use client";

import { useStore } from "@/lib/store";

export default function Home() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">営業計画管理システム</h1>
        </div>
      </header>

      {/* タブナビゲーション */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("vision")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "vision"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ①目指す姿
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "performance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ②業績計画
            </button>
            <button
              onClick={() => setActiveTab("focus")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "focus"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ③重点顧客の活動計画
            </button>
            <button
              onClick={() => setActiveTab("base")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "base"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ④重点外顧客の活動計画
            </button>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "vision" && <VisionTab />}
        {activeTab === "performance" && <PerformanceTab />}
        {activeTab === "focus" && <FocusTab />}
        {activeTab === "base" && <BaseTab />}
      </main>
    </div>
  );
}

// Vision タブ
function VisionTab() {
  const { visionData, updateVisionData, saveData } = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          ①目指す姿：自身の現状とこれからを展望する
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          今からはじまる営業計画。単なる目標達成やMustをやりきるための計画に終わらず、自分や営業さきの未来にとって意味あるもののにしましょう。
        </p>

        {/* 使う上でのポイント */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">使う上でのポイント</h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>慣れないうちは、まず今の手帳で考えてみることといたいか大事。さらりてもかまわないので、書いてみる。</li>
            <li>必要に応じて、Mgrの力借りながら書いてみてください。</li>
            <li>期中にときどき、読み返す。自分の前のことに追われ、やらされ感が湧いているときに、抜け出すキッカケになる。かもしれない。</li>
          </ul>
        </div>

        {/* ありたい姿と目指したこと */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">先半期の振り返り</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">できたこと</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="前期に達成できたことを記入してください"
                  value={visionData.achieved}
                  onChange={(e) => updateVisionData({ achieved: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 opacity-0">　</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">できなかったこと</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="前期にできなかったことを記入してください"
                  value={visionData.notAchieved}
                  onChange={(e) => updateVisionData({ notAchieved: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 今後目指したい姿 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            今後目指したい姿（1〜3年のいゆるレンジで）／キャリアの方向性
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="将来的に目指したい姿を記入してください"
            value={visionData.futureGoal}
            onChange={(e) => updateVisionData({ futureGoal: e.target.value })}
          />
        </div>

        {/* 個人としての今期の意味づけ */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            個人としての今期の意味づけ
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="今期の意味づけを記入してください"
            value={visionData.termMeaning}
            onChange={(e) => updateVisionData({ termMeaning: e.target.value })}
          />
        </div>

        {/* 下部の3つのボックス */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              今期出したい成果（定量・定性・それられ書いてみましょう）
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="成果目標を記入してください"
              value={visionData.quantitativeGoal}
              onChange={(e) => updateVisionData({ quantitativeGoal: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              今期取り組みたいこと（やること）
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="取り組みたいことを記入してください"
              value={visionData.qualitativeGoal}
              onChange={(e) => updateVisionData({ qualitativeGoal: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              今期こだわりたいこと（スタンス）
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder="こだわりポイントを記入してください"
              value={visionData.stance}
              onChange={(e) => updateVisionData({ stance: e.target.value })}
            />
          </div>
        </div>

        {/* グループメンバーに期待つてほしい観点 */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            グループメンバーに期待つてほしい観点
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="メンバーに期待することを記入してください"
            value={visionData.memberExpectations}
            onChange={(e) => updateVisionData({ memberExpectations: e.target.value })}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={saveData}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

// Performance タブ
function PerformanceTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          ②業績計画：期初・・・今半期の業績のスタート地点を確認する
        </h2>
        <p className="text-sm text-gray-600 mb-2">期中・・・現在地を確認する</p>

        {/* 期ごとの比較表 */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-900"></th>
                <th className="px-4 py-2 bg-blue-50 text-center text-sm font-semibold text-gray-900">37下期</th>
                <th className="px-4 py-2 bg-green-50 text-center text-sm font-semibold text-gray-900">38上期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">現象予</td>
                <td className="px-4 py-2 text-right text-sm">80,000</td>
                <td className="px-4 py-2 text-right text-sm"></td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">A主＋Aイレギュラー(値引)</td>
                <td className="px-4 py-2 text-right text-sm">0</td>
                <td className="px-4 py-2 text-right text-sm">0</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">経常＋Bレグノ（マイナス表示）</td>
                <td className="px-4 py-2 text-right text-sm">0</td>
                <td className="px-4 py-2 text-right text-sm">0</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">必要な新規提供者金額</td>
                <td className="px-4 py-2 text-right text-sm">80,000</td>
                <td className="px-4 py-2 text-right text-sm">0</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">必要な新規提供の受注率</td>
                <td className="px-4 py-2 text-right text-sm">240,000</td>
                <td className="px-4 py-2 text-right text-sm">0</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-50">
                  必要な新規提供確保の目安
                </td>
                <td className="px-4 py-2 text-right text-sm bg-yellow-50">240,000</td>
                <td className="px-4 py-2 text-right text-sm bg-yellow-50">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 顧客別の詳細テーブル */}
        <div className="space-y-8">
          {/* キャンセルリスクが高い組織 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 bg-yellow-100 p-2 rounded">
              キャンセルリスクが高い組織（マイナス表示）
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">案件</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">確度</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">金額</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">受注下予定日</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">案件</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">確度</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">金額</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">受注下予定日</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 text-sm" colSpan={10}>データがありません</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* A主 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 bg-green-100 p-2 rounded">A主</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">案件</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">確度</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">金額</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">受注下予定日</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">案件</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">確度</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">金額</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">受注下予定日</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 text-sm" colSpan={10}>データがありません</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* B・C・ネラ */}
          <div>
            <h3 className="text-lg font-semibold mb-3 bg-orange-100 p-2 rounded">B・C・ネラ</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">フラグ</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">案件</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">確度</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">金額</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">受注下予定日</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">フラグ</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">案件</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">確度</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">金額</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">受注下予定日</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2 text-sm" colSpan={12}>データがありません</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            CSV読み込み
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

// Focus タブ
function FocusTab() {
  const { focusCustomers, selectedCustomerIndex, setSelectedCustomerIndex } = useStore();
  const months = ["10月", "11月", "12月", "1月", "2月", "3月"];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        {/* 顧客タブ */}
        <div className="border-b">
          <div className="flex space-x-1 px-6 pt-4">
            {focusCustomers.map((customer, index) => (
              <button
                key={index}
                onClick={() => setSelectedCustomerIndex(index)}
                className={`px-4 py-2 rounded-t-lg font-medium text-sm ${
                  selectedCustomerIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {customer.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">③重点顧客の活動計画</h2>

          {/* 関係性レベル選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              関係性レベル
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>レベル1：面識あり</option>
              <option>レベル2：定期的な接点</option>
              <option>レベル3：信頼関係構築</option>
              <option>レベル4：戦略的パートナー</option>
            </select>
          </div>

          {/* 今期の目標 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                定量目標
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例：売上 5,000万円"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                定性目標
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例：役員との関係構築"
              />
            </div>
          </div>

          {/* 月次計画 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">月次計画</h3>
            <div className="space-y-4">
              {months.map((month) => (
                <div key={month} className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-semibold mb-2">{month}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        目標・アクション
                      </label>
                      <textarea
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        placeholder="この月の目標とアクションを記入"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        振り返り
                      </label>
                      <textarea
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                        placeholder="月末に振り返りを記入"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 今期の振り返り */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              今期の振り返り（期末に記入）
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="期末に今期全体の振り返りを記入してください"
            />
          </div>

          {/* イベント一覧 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">イベント・活動履歴</h3>
              <button className="px-4 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                + 手動追加
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">日付</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">種類</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">内容</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">ソース</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm" colSpan={4}>
                      イベントデータがありません（CSV読み込み後に自動反映されます）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Base タブ
function BaseTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">④重点外顧客の活動計画</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">社名</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">担当営業数</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">年度（累計ベースより）</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">今期終了予算の37下期数字</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">今期終了予算の38上期数字</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">ひな状況になっていればOK？</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">今後への向け・施策</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">活動の焦点</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm">株）某和巧システムズ株式会社</td>
                <td className="px-4 py-3 text-sm">2,000</td>
                <td className="px-4 py-3 text-sm">5,000</td>
                <td className="px-4 py-3 text-sm">11,000</td>
                <td className="px-4 py-3 text-sm">19,000</td>
                <td className="px-4 py-3 text-sm">
                  人事部長からSRMSに移らな触実施されるいう触感がある（感覚の営業先らあるてもる）
                </td>
                <td className="px-4 py-3 text-sm">
                  ・ドンド採用品・報告会<br/>
                  ・情報収動（新人入中超2&amp;上・割任マネガー）<br/>
                  ＜面談＞<br/>
                  ・年代惑士エツクげ経費
                </td>
                <td className="px-4 py-3 text-sm">
                  ・情報収取支者確認の会全体需要をスヌす行<br/>
                  ・ガウンナード②の入通実数との情報昭的な情報提供で講している計叫す行け
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm" colSpan={8}>
                  <div className="text-center text-gray-500 py-4">
                    他の顧客データはCSV読み込み後に表示されます
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            CSV読み込み
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
