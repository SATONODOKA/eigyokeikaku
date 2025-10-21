"use client";

import React from "react";
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
      <main className="w-full px-4 py-4">
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
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-4 h-full overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          ①目指す姿：自身の現状とこれからを展望する
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          今からはじまる営業計画。単なる目標達成やMustをやりきるための計画に終わらず、自分や営業先の未来にとって意味あるものにしましょう。
        </p>

        {/* 使う上でのポイント */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-1.5 text-sm">使う上でのポイント</h3>
          <ul className="text-xs text-gray-700 space-y-0.5 list-disc list-inside">
            <li>慣れないうちは、まず今の手帳で考えてみることといたいかが大事。さらっとでもかまわないので、書いてみる。</li>
            <li>必要に応じて、マネージャーの力を借りながら書いてみてください。</li>
            <li>期中にときどき、読み返す。自分の目の前のことに追われ、やらされ感が湧いているときに、抜け出すキッカケになる。かもしれない。</li>
          </ul>
        </div>

        {/* ありたい姿と目指したこと */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <h3 className="font-semibold mb-2 text-sm">先半期の振り返り</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">できたこと</label>
                <textarea
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows={6}
                  placeholder="例：新規顧客3社獲得、既存顧客との関係強化、チーム目標達成"
                  value={visionData.achieved}
                  onChange={(e) => updateVisionData({ achieved: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm opacity-0">　</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">できなかったこと</label>
                <textarea
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows={6}
                  placeholder="例：長期的な関係構築、戦略的提案の不足"
                  value={visionData.notAchieved}
                  onChange={(e) => updateVisionData({ notAchieved: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 今後目指したい姿 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            今後目指したい姿（1〜3年のいわゆるレンジで）／キャリアの方向性
          </label>
          <textarea
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            rows={5}
            placeholder="例：顧客と長期的な信頼関係を築けるビジネスパートナーになる、戦略的な提案ができる営業のプロフェッショナルを目指す"
            value={visionData.futureGoal}
            onChange={(e) => updateVisionData({ futureGoal: e.target.value })}
          />
        </div>

        {/* 個人としての今期の意味づけ */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            個人としての今期の意味づけ
          </label>
          <textarea
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            rows={5}
            placeholder="例：顧客理解を深め、本質的な課題解決ができる力を身につける期にする"
            value={visionData.termMeaning}
            onChange={(e) => updateVisionData({ termMeaning: e.target.value })}
          />
        </div>

        {/* 下部の3つのボックス */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              今期出したい成果（定量・定性・それぞれ書いてみましょう）
            </label>
            <textarea
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              rows={8}
              placeholder="例：&#10;【定量】売上目標5,000万円達成、新規顧客5社獲得&#10;【定性】顧客との信頼関係構築、戦略的提案力の向上"
              value={visionData.quantitativeGoal}
              onChange={(e) => updateVisionData({ quantitativeGoal: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              今期取り組みたいこと（やること）
            </label>
            <textarea
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              rows={8}
              placeholder="例：月次での振り返り習慣化、顧客ニーズの深掘りヒアリング、業界動向の継続的なキャッチアップ"
              value={visionData.qualitativeGoal}
              onChange={(e) => updateVisionData({ qualitativeGoal: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              今期こだわりたいこと（スタンス）
            </label>
            <textarea
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              rows={8}
              placeholder="例：顧客視点で考える、長期的な関係を大切にする、チームで成果を出す"
              value={visionData.stance}
              onChange={(e) => updateVisionData({ stance: e.target.value })}
            />
          </div>
        </div>

        {/* グループメンバーに期待つてほしい観点 */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            グループメンバーに期待してほしい観点
          </label>
          <textarea
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            rows={4}
            placeholder="例：困ったときは相談してほしい、チームで情報共有を積極的にしたい、お互いの成長を支援し合いたい"
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
  const { saveData } = useStore();
  
  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          ②業績計画：期初・・・今半期の業績のスタート地点を確認する
        </h2>
        <p className="text-xs text-gray-600 mb-4">期中・・・現在地を確認する</p>

        {/* 期ごとの比較表 */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-200 text-sm border">
            <thead>
              <tr>
                <th className="px-3 py-2 bg-gray-50 text-left text-xs font-semibold text-gray-900 border-r"></th>
                <th className="px-3 py-2 bg-blue-100 text-center text-xs font-semibold text-gray-900">37下期</th>
                <th className="px-3 py-2 bg-green-100 text-center text-xs font-semibold text-gray-900">38上期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r">目標数</td>
                <td className="px-3 py-2 text-right text-xs">80,000</td>
                <td className="px-3 py-2 text-right text-xs"></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r">現実予</td>
                <td className="px-3 py-2 text-right text-xs"></td>
                <td className="px-3 py-2 text-right text-xs"></td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r">A主　キャンセルリスクの危険</td>
                <td className="px-3 py-2 text-right text-xs">0</td>
                <td className="px-3 py-2 text-right text-xs">0</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r">新規提案プランの提案（マイナス表記）</td>
                <td className="px-3 py-2 text-right text-xs">0</td>
                <td className="px-3 py-2 text-right text-xs">0</td>
              </tr>
              <tr className="bg-white">
                <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r">必要な新規成長件数</td>
                <td className="px-3 py-2 text-right text-xs">80,000</td>
                <td className="px-3 py-2 text-right text-xs">0</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-3 py-2 text-xs font-medium text-gray-900 border-r">必要な新規案件の目安</td>
                <td className="px-3 py-2 text-right text-xs">240,000</td>
                <td className="px-3 py-2 text-right text-xs">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          ※前期までの他施策の提供単価の目安：240,000
        </p>

        {/* 顧客別の詳細テーブル */}
        <div className="space-y-4">
          {/* キャンセルリスク/ネタ顧客 */}
          <div>
            <h3 className="text-sm font-semibold mb-2 bg-red-100 p-2 rounded">
              キャンセルリスク/ネタ顧客（マイナス表記）
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受任</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">地域</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">名称</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受け予定日</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 border-l-2">社名</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受任</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">地域</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">名称</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受け予定日</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-2 text-xs text-center text-gray-400" colSpan={10}>データがありません</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* A主 */}
          <div>
            <h3 className="text-sm font-semibold mb-2 bg-green-100 p-2 rounded">A主</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受任</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">地域</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">名称</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受け予定日</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 border-l-2">社名</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受任</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">地域</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">名称</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受け予定日</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-2 text-xs text-center text-gray-400" colSpan={10}>データがありません</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* B・C・ネタ */}
          <div>
            <h3 className="text-sm font-semibold mb-2 bg-orange-100 p-2 rounded">フラグ　B・C・ネタ</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">フラグ</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受任</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">地域</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">名称</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受け予定日</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500 border-l-2">フラグ</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">社名</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受任</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">地域</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">名称</th>
                    <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-500">受け予定日</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-2 py-2 text-xs text-center text-gray-400" colSpan={12}>データがありません</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-2 flex justify-end space-x-4 text-xs">
              <span>合計：<span className="font-semibold">0</span></span>
              <span>フラグ委任中の合計：<span className="font-semibold">0</span></span>
              <span>フラグ委任中の合計：<span className="font-semibold">0</span></span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={saveData}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

// Focus タブ
function FocusTab() {
  const { focusCustomers, selectedCustomerIndex, setSelectedCustomerIndex, saveData } = useStore();
  const months = ["10月", "11月", "12月", "1月", "2月", "3月"];

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow h-full flex flex-col">
        {/* 顧客タブ */}
        <div className="border-b flex-shrink-0">
          <div className="flex space-x-1 px-4 pt-3">
            {focusCustomers.map((customer, index) => (
              <button
                key={index}
                onClick={() => setSelectedCustomerIndex(index)}
                className={`px-3 py-1.5 rounded-t-lg font-medium text-sm ${
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

        {/* 2カラムレイアウト */}
        <div className="flex-1 grid grid-cols-3 gap-0 overflow-hidden">
          {/* 左側：過去イベント履歴（1/3幅） */}
          <div className="border-r flex flex-col overflow-hidden">
            <div className="p-3 border-b bg-gray-50 flex-shrink-0">
              <h3 className="font-semibold text-sm">過去イベント・活動履歴</h3>
              <p className="text-xs text-gray-500 mt-1">これを見ながら右側に計画を記入→</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {/* サンプルイベント */}
              <div className="border rounded p-2 bg-white text-xs">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold">2024/09/15</span>
                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs">研修</span>
                </div>
                <p className="text-gray-700">新人研修実施（参加者12名）</p>
              </div>
              <div className="border rounded p-2 bg-white text-xs">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold">2024/08/20</span>
                  <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs">提案</span>
                </div>
                <p className="text-gray-700">人事システム刷新の提案実施</p>
              </div>
              <div className="border rounded p-2 bg-white text-xs">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold">2024/07/10</span>
                  <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-xs">報告会</span>
                </div>
                <p className="text-gray-700">第2四半期実績報告会</p>
              </div>
              <div className="text-center text-gray-400 text-xs mt-4 py-4 border-t">
                CSV読み込みで自動反映されます
              </div>
            </div>
            <div className="p-2 border-t bg-gray-50 flex-shrink-0">
              <button className="w-full px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                + イベント手動追加
              </button>
            </div>
          </div>

          {/* 右側：計画入力エリア（2/3幅） */}
          <div className="col-span-2 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <h2 className="text-lg font-bold text-gray-900">③重点顧客の活動計画</h2>

              {/* 基本情報 */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">関係性レベル</label>
                  <select className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500">
                    <option>レベル1：面識あり</option>
                    <option>レベル2：定期的な接点</option>
                    <option>レベル3：信頼関係構築</option>
                    <option>レベル4：戦略的パートナー</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">定量目標</label>
                  <input
                    type="text"
                    className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="例：売上 5,000万円"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">定性目標</label>
                  <input
                    type="text"
                    className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="例：役員との関係構築"
                  />
                </div>
              </div>

              {/* 月次計画（コンパクトに） */}
              <div>
                <h3 className="text-sm font-semibold mb-2">月次計画</h3>
                <div className="space-y-2">
                  {months.map((month) => (
                    <div key={month} className="border rounded p-2 bg-gray-50">
                      <div className="font-semibold text-sm mb-1.5">{month}</div>
                      <div className="grid grid-cols-2 gap-2">
                        <textarea
                          className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          rows={3}
                          placeholder="目標・アクション"
                        />
                        <textarea
                          className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          rows={3}
                          placeholder="振り返り"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 今期の振り返り */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">今期の振り返り（期末に記入）</label>
                <textarea
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows={4}
                  placeholder="期末に今期全体の振り返りを記入してください"
                />
              </div>
            </div>

            {/* 保存ボタン */}
            <div className="p-3 border-t bg-gray-50 flex justify-end flex-shrink-0">
              <button 
                onClick={saveData}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Base タブ
function BaseTab() {
  const { saveData } = useStore();
  const months = ["10月", "11月", "12月", "1月", "2月", "3月"];

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
        <h2 className="text-lg font-bold text-gray-900 mb-3">④重点外顧客の活動計画</h2>

        <div className="flex-1 overflow-auto border rounded">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 sticky left-0 bg-gray-50 z-10 border-r">社名</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">担当営業数</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">年度累計</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">37下期</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">38上期</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">現状認識</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">施策</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-r">活動焦点</th>
                {months.map((month) => (
                  <React.Fragment key={month}>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 bg-blue-50">{month}<br/>行動予定</th>
                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 bg-green-50 border-r">{month}<br/>振り返り</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 text-xs font-medium sticky left-0 bg-white border-r">株）グローバルシステムズ</td>
                <td className="px-2 py-2 text-xs">2,000</td>
                <td className="px-2 py-2 text-xs">5,000</td>
                <td className="px-2 py-2 text-xs">11,000</td>
                <td className="px-2 py-2 text-xs">19,000</td>
                <td className="px-2 py-2 text-xs max-w-xs">
                  人事部長からHRシステム刷新の検討を進めたいという意向あり（感触良好）
                </td>
                <td className="px-2 py-2 text-xs">
                  ・定例報告会・研修実施<br/>
                  ・情報収集（新人入社予定人数・管理職研修ニーズ）<br/>
                  ＜面談＞<br/>
                  ・年代別キャリア研修提案
                </td>
                <td className="px-2 py-2 text-xs border-r">
                  ・情報収集を通じて全社ニーズを把握<br/>
                  ・カウンターパートとの信頼関係構築と定期的な情報提供を継続
                </td>
                {months.map((month) => (
                  <React.Fragment key={month}>
                    <td className="px-2 py-2 text-xs bg-blue-50/30">
                      <textarea 
                        className="w-32 h-16 p-1 text-xs border border-gray-300 rounded resize-none focus:ring-1 focus:ring-blue-500"
                        placeholder="行動予定を入力"
                      />
                    </td>
                    <td className="px-2 py-2 text-xs bg-green-50/30 border-r">
                      <textarea 
                        className="w-32 h-16 p-1 text-xs border border-gray-300 rounded resize-none focus:ring-1 focus:ring-green-500"
                        placeholder="振り返りを入力"
                      />
                    </td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                <td className="px-2 py-4 text-xs text-center text-gray-400" colSpan={20}>
                  他の顧客データはCSV読み込み後に表示されます
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-end space-x-2 flex-shrink-0">
          <button className="px-4 py-1.5 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            CSV読み込み
          </button>
          <button 
            onClick={saveData}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
