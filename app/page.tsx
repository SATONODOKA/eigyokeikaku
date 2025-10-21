"use client";

import React from "react";
import { useStore } from "@/lib/store";

export default function Home() {
  const { activeTab, setActiveTab } = useStore();

  // ホームタブの場合は別レイアウト
  if (activeTab === "home") {
    return <HomeTab />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">営業計画管理システム</h1>
        </div>
      </header>

      {/* タブナビゲーション */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("home")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "home"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              ⓪ホーム
            </button>
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
      <main className="w-full px-2 sm:px-4 lg:px-6 py-2 sm:py-4">
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
      <div className="bg-white rounded-lg shadow p-3 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            ①目指す姿：自身の現状とこれからを展望する
          </h2>
          <button
            onClick={() => alert('【使う上でのポイント】\n\n• 慣れないうちは、まず今の手帳で考えてみることといたいかが大事。さらっとでもかまわないので、書いてみる。\n• 必要に応じて、マネージャーの力を借りながら書いてみてください。\n• 期中にときどき、読み返す。自分の目の前のことに追われ、やらされ感が湧いているときに、抜け出すキッカケになる。かもしれない。')}
            className="w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
            title="ヒントを見る"
          >
            ?
          </button>
        </div>

        {/* ありたい姿と目指したこと */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <h3 className="font-semibold mb-1 text-sm">先半期の振り返り</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">できたこと</label>
                <textarea
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="例：新規顧客3社獲得、既存顧客との関係強化、チーム目標達成"
                  value={visionData.achieved}
                  onChange={(e) => updateVisionData({ achieved: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm opacity-0">　</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">できなかったこと</label>
                <textarea
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="例：長期的な関係構築、戦略的提案の不足"
                  value={visionData.notAchieved}
                  onChange={(e) => updateVisionData({ notAchieved: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 今後目指したい姿 */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            今後目指したい姿（1〜3年のいわゆるレンジで）／キャリアの方向性
          </label>
          <textarea
            className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            rows={3}
            placeholder="例：顧客と長期的な信頼関係を築けるビジネスパートナーになる、戦略的な提案ができる営業のプロフェッショナルを目指す"
            value={visionData.futureGoal}
            onChange={(e) => updateVisionData({ futureGoal: e.target.value })}
          />
        </div>

        {/* 個人としての今期の意味づけ */}
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            個人としての今期の意味づけ
          </label>
          <textarea
            className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
            rows={3}
            placeholder="例：顧客理解を深め、本質的な課題解決ができる力を身につける期にする"
            value={visionData.termMeaning}
            onChange={(e) => updateVisionData({ termMeaning: e.target.value })}
          />
        </div>

        {/* 下部の3つのボックス */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 mb-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              今期出したい成果（定量・定性・それぞれ書いてみましょう）
            </label>
            <textarea
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              rows={4}
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
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              rows={4}
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
              className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              rows={4}
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

// Performance セクションコンポーネント
function PerformanceSection({ 
  title, 
  items, 
  onItemsChange, 
  bgColor, 
  total,
  showTreatAsA = false
}: { 
  title: string; 
  items: any[]; 
  onItemsChange: (items: any[]) => void; 
  bgColor: string; 
  total: number;
  showTreatAsA?: boolean;
}) {
  const addRow = () => {
    onItemsChange([...items, { 
      id: Date.now().toString(), 
      company: '', 
      project: '', 
      probability: '', 
      amount: 0, 
      expectedDate: '',
      treatAsA: false
    }]);
  };

  const updateRow = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onItemsChange(newItems);
  };

  const deleteRow = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className={`mb-4 p-3 ${bgColor} rounded-lg`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs">合計: <span className="font-bold text-lg">{total.toLocaleString()}</span></span>
          <button
            onClick={addRow}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            + 行追加
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-white">
              {showTreatAsA && <th className="border px-2 py-1 text-center font-medium w-16">A扱い</th>}
              <th className="border px-2 py-1 text-left font-medium">社名</th>
              <th className="border px-2 py-1 text-left font-medium">案件</th>
              <th className="border px-2 py-1 text-center font-medium">確度</th>
              <th className="border px-2 py-1 text-right font-medium">金額</th>
              <th className="border px-2 py-1 text-center font-medium">受注予定日</th>
              <th className="border px-2 py-1 text-center font-medium w-16">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="bg-white">
                {showTreatAsA && (
                  <td className="border px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={item.treatAsA || false}
                      onChange={(e) => updateRow(index, 'treatAsA', e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                      title="A扱いにする（90%確度で計算）"
                    />
                  </td>
                )}
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => updateRow(index, 'company', e.target.value)}
                    className="w-full px-1 py-0.5 text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={item.project}
                    onChange={(e) => updateRow(index, 'project', e.target.value)}
                    className="w-full px-1 py-0.5 text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={item.probability}
                    onChange={(e) => updateRow(index, 'probability', e.target.value)}
                    className="w-full px-1 py-0.5 text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded text-center"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    value={item.amount || ''}
                    onChange={(e) => updateRow(index, 'amount', Number(e.target.value))}
                    className="w-full px-1 py-0.5 text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded text-right"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="date"
                    value={item.expectedDate}
                    onChange={(e) => updateRow(index, 'expectedDate', e.target.value)}
                    className="w-full px-1 py-0.5 text-xs border-0 focus:ring-1 focus:ring-blue-500 rounded"
                  />
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => deleteRow(index)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={showTreatAsA ? 7 : 6} className="border px-2 py-4 text-center text-gray-400 text-xs">
                  データがありません。「+ 行追加」ボタンで追加するか、CSVファイルを読み込んでください。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Performance タブ
function PerformanceTab() {
  const { performanceData, saveData } = useStore();
  const [targetAmount, setTargetAmount] = React.useState(performanceData.targetAmount);
  const [currentAmount, setCurrentAmount] = React.useState(performanceData.currentAmount);
  const [cancelRisk, setCancelRisk] = React.useState(performanceData.cancelRisk);
  const [aYomiItems, setAYomiItems] = React.useState(performanceData.aYomiItems);
  const [bYomiItems, setBYomiItems] = React.useState(performanceData.bYomiItems);
  const [cYomiItems, setCYomiItems] = React.useState(performanceData.cYomiItems);
  const [netaYomiItems, setNetaYomiItems] = React.useState(performanceData.netaYomiItems);

  // 計算ロジック（treatAsAフラグを考慮）
  // A扱いされるB/C案件の合計
  const bTreatAsATotal = bYomiItems.filter(item => item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  const cTreatAsATotal = cYomiItems.filter(item => item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  
  // 実際のA/B/C合計（treatAsAフラグに基づく）
  const aYomiTotal = aYomiItems.reduce((sum, item) => sum + item.amount, 0) + bTreatAsATotal + cTreatAsATotal;
  const bYomiTotal = bYomiItems.filter(item => !item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  const cYomiTotal = cYomiItems.filter(item => !item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  const netaYomiTotal = netaYomiItems.reduce((sum, item) => sum + item.amount, 0);

  const aYomiExpected = aYomiTotal * 0.9;
  const abYomiExpected = aYomiTotal * 0.9 + bYomiTotal * 0.4;
  const abcYomiExpected = aYomiTotal * 0.9 + bYomiTotal * 0.4 + cYomiTotal * 0.1;

  const requiredNewOrders = targetAmount - abcYomiExpected - cancelRisk;
  const requiredNewProposals = requiredNewOrders * 3;

  const canSave = targetAmount > 0 && currentAmount > 0;

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-3 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">②業績計画</h2>
          <button 
            onClick={saveData}
            disabled={!canSave}
            className={`px-4 py-1.5 text-xs rounded ${
              canSave 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            保存
          </button>
        </div>

        {/* 目標設定 */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">目標設定（必須）</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                目標額 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={targetAmount || ''}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="80,000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                現数字 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={currentAmount || ''}
                onChange={(e) => setCurrentAmount(Number(e.target.value))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="69,000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                キャンセルリスク（マイナス表記）
              </label>
              <input
                type="number"
                value={cancelRisk || ''}
                onChange={(e) => setCancelRisk(Number(e.target.value))}
                className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="-10,999"
              />
            </div>
          </div>
        </div>

        {/* 読み込み時の見込み額 */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">読み込み時の見込み額</h3>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <div className="font-medium text-gray-700">Aヨミが入れば</div>
              <div className="text-lg font-bold text-blue-600">{aYomiExpected.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">A+Bヨミが入れば</div>
              <div className="text-lg font-bold text-blue-600">{abYomiExpected.toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">A+B+Cヨミが入れば</div>
              <div className="text-lg font-bold text-blue-600">{abcYomiExpected.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* 必要額の計算 */}
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">必要額の計算</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="font-medium text-gray-700">必要な新規受注額</div>
              <div className="text-lg font-bold text-green-600">{requiredNewOrders.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500">= 目標額 - ABC見込み額 - キャンセル見込み額</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">必要な新規提案額の目安</div>
              <div className="text-lg font-bold text-green-600">{requiredNewProposals.toLocaleString()}</div>
              <div className="text-[10px] text-gray-500">= 必要な新規受注額 × 3</div>
            </div>
          </div>
        </div>

        {/* Aヨミ（90%確度） */}
        <PerformanceSection 
          title="Aヨミ（90%確度）" 
          items={aYomiItems}
          onItemsChange={setAYomiItems}
          bgColor="bg-green-50"
          total={aYomiItems.reduce((sum, item) => sum + item.amount, 0)}
          showTreatAsA={false}
        />

        {/* Bヨミ（40%確度） */}
        <PerformanceSection 
          title="Bヨミ（40%確度）" 
          items={bYomiItems}
          onItemsChange={setBYomiItems}
          bgColor="bg-blue-50"
          total={bYomiItems.reduce((sum, item) => sum + item.amount, 0)}
          showTreatAsA={true}
        />

        {/* Cヨミ（10%確度） */}
        <PerformanceSection 
          title="Cヨミ（10%確度）" 
          items={cYomiItems}
          onItemsChange={setCYomiItems}
          bgColor="bg-orange-50"
          total={cYomiItems.reduce((sum, item) => sum + item.amount, 0)}
          showTreatAsA={true}
        />

        {/* ネタ（わんちゃんある案件） */}
        <PerformanceSection 
          title="ネタ（わんちゃんある案件）" 
          items={netaYomiItems}
          onItemsChange={setNetaYomiItems}
          bgColor="bg-gray-50"
          total={netaYomiTotal}
          showTreatAsA={false}
        />
      </div>
    </div>
  );
}

// Focus タブ
function FocusTab() {
  const { focusCustomers, selectedCustomerIndex, setSelectedCustomerIndex, updateCustomerData, saveData } = useStore();
  const months = ["10月", "11月", "12月", "1月", "2月", "3月"];
  const currentCustomer = focusCustomers[selectedCustomerIndex];

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

        {/* 2カラムレイアウト - レスポンシブ対応 */}
        <div className="flex-1 grid lg:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-0 overflow-hidden">
          {/* 左側：過去イベント履歴（lg:1/3, md:2/5, sm:全幅） */}
          <div className="lg:col-span-1 md:col-span-2 border-r flex flex-col overflow-hidden">
            <div className="p-3 border-b bg-gray-50 flex-shrink-0">
              <h3 className="font-semibold text-sm">過去イベント・活動履歴</h3>
              <p className="text-xs text-gray-500 mt-1">これを見ながら右側に計画を記入→</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {/* イベント履歴を動的に表示 */}
              {currentCustomer.events.map((event, idx) => (
                <div key={idx} className="border rounded p-2 bg-white text-xs">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold">{event.date}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${
                      event.type === '研修' ? 'bg-blue-100 text-blue-800' :
                      event.type === '提案' ? 'bg-green-100 text-green-800' :
                      event.type === '面談' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-700">{event.content}</p>
                </div>
              ))}
              {currentCustomer.events.length === 0 && (
                <div className="text-center text-gray-400 text-xs mt-4 py-4 border-t">
                  CSV読み込みで自動反映されます
                </div>
              )}
            </div>
            <div className="p-2 border-t bg-gray-50 flex-shrink-0">
              <button className="w-full px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                + イベント手動追加
              </button>
            </div>
          </div>

          {/* 右側：計画入力エリア（lg:2/3, md:3/5, sm:全幅） */}
          <div className="lg:col-span-2 md:col-span-3 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              <h2 className="text-lg font-bold text-gray-900">③重点顧客の活動計画</h2>

              {/* 基本情報 */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">関係性レベル</label>
                  <select 
                    className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    value={currentCustomer.relationLevel}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { relationLevel: e.target.value })}
                  >
                    <option value="level1">レベル1：面識あり</option>
                    <option value="level2">レベル2：定期的な接点</option>
                    <option value="level3">レベル3：信頼関係構築</option>
                    <option value="level4">レベル4：戦略的パートナー</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">定量目標</label>
                  <input
                    type="text"
                    className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="例：売上 5,000万円"
                    value={currentCustomer.quantitativeGoal}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { quantitativeGoal: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">定性目標</label>
                  <input
                    type="text"
                    className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    placeholder="例：役員との関係構築"
                    value={currentCustomer.qualitativeGoal}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { qualitativeGoal: e.target.value })}
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
                          value={currentCustomer.monthlyPlans[month]?.goal || ''}
                          onChange={(e) => updateCustomerData(selectedCustomerIndex, {
                            monthlyPlans: {
                              ...currentCustomer.monthlyPlans,
                              [month]: {
                                goal: e.target.value,
                                reflection: currentCustomer.monthlyPlans[month]?.reflection || ''
                              }
                            }
                          })}
                        />
                        <textarea
                          className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          rows={3}
                          placeholder="振り返り"
                          value={currentCustomer.monthlyPlans[month]?.reflection || ''}
                          onChange={(e) => updateCustomerData(selectedCustomerIndex, {
                            monthlyPlans: {
                              ...currentCustomer.monthlyPlans,
                              [month]: {
                                goal: currentCustomer.monthlyPlans[month]?.goal || '',
                                reflection: e.target.value
                              }
                            }
                          })}
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
                  value={currentCustomer.termReview}
                  onChange={(e) => updateCustomerData(selectedCustomerIndex, { termReview: e.target.value })}
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
  const { baseCustomers, updateBaseCustomer, saveData } = useStore();
  const months = ["10月", "11月", "12月", "1月", "2月", "3月"];

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-3 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-gray-900">④重点外顧客の活動計画</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700">
              CSV読み込み
            </button>
            <button 
              onClick={saveData}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>

        {/* 顧客リスト - カード形式 */}
        <div className="flex-1 overflow-auto space-y-2">
          {baseCustomers.map((customer, customerIndex) => (
            <div key={customer.id} className="border rounded-lg p-2 hover:shadow-md transition-shadow">
              {/* 顧客基本情報 */}
              <div className="grid xl:grid-cols-12 lg:grid-cols-8 md:grid-cols-6 grid-cols-4 gap-2 text-[10px] mb-2 pb-2 border-b">
                <div className="xl:col-span-2 lg:col-span-3 md:col-span-3 col-span-4">
                  <label className="text-gray-500 block mb-0.5">社名</label>
                  <input 
                    type="text" 
                    value={customer.name}
                    onChange={(e) => updateBaseCustomer(customerIndex, { name: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-[10px] font-medium"
                  />
                </div>
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                  <label className="text-gray-500 block mb-0.5 text-[9px]">担当営業数</label>
                  <input 
                    type="text" 
                    value={customer.salesCount}
                    onChange={(e) => updateBaseCustomer(customerIndex, { salesCount: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-right text-[10px]" 
                  />
                </div>
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                  <label className="text-gray-500 block mb-0.5 text-[9px]">年度累計</label>
                  <input 
                    type="text" 
                    value={customer.yearTotal}
                    onChange={(e) => updateBaseCustomer(customerIndex, { yearTotal: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-right text-[10px]" 
                  />
                </div>
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                  <label className="text-gray-500 block mb-0.5 text-[9px]">37下期</label>
                  <input 
                    type="text" 
                    value={customer.term37}
                    onChange={(e) => updateBaseCustomer(customerIndex, { term37: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-right text-[10px]" 
                  />
                </div>
                <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-1">
                  <label className="text-gray-500 block mb-0.5 text-[9px]">38上期</label>
                  <input 
                    type="text" 
                    value={customer.term38}
                    onChange={(e) => updateBaseCustomer(customerIndex, { term38: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-right text-[10px]" 
                  />
                </div>
                <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="text-gray-500 block mb-0.5">現状認識</label>
                  <textarea 
                    value={customer.currentStatus}
                    onChange={(e) => updateBaseCustomer(customerIndex, { currentStatus: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-[10px] resize-none"
                    rows={2}
                  />
                </div>
                <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="text-gray-500 block mb-0.5">施策</label>
                  <textarea 
                    value={customer.measures}
                    onChange={(e) => updateBaseCustomer(customerIndex, { measures: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-[10px] resize-none"
                    rows={2}
                  />
                </div>
                <div className="xl:col-span-2 lg:col-span-2 md:col-span-2 col-span-4">
                  <label className="text-gray-500 block mb-0.5">活動焦点</label>
                  <textarea 
                    value={customer.focus}
                    onChange={(e) => updateBaseCustomer(customerIndex, { focus: e.target.value })}
                    className="w-full px-1 py-0.5 border rounded text-[10px] resize-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* 月次計画 - 横スクロール */}
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {months.map((month) => (
                    <div key={month} className="lg:w-48 md:w-40 w-36 flex-shrink-0">
                      <div className="text-[10px] font-semibold mb-1 text-center bg-gray-100 py-0.5 rounded">{month}</div>
                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <label className="text-[9px] text-gray-500 block mb-0.5">行動予定</label>
                          <textarea 
                            className="w-full px-1 py-0.5 text-[9px] border rounded bg-blue-50/30 resize-none"
                            rows={3}
                            placeholder="予定を入力"
                            value={customer.monthlyPlans[month]?.plan || ''}
                            onChange={(e) => updateBaseCustomer(customerIndex, {
                              monthlyPlans: {
                                ...customer.monthlyPlans,
                                [month]: {
                                  plan: e.target.value,
                                  reflection: customer.monthlyPlans[month]?.reflection || ''
                                }
                              }
                            })}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-gray-500 block mb-0.5">振り返り</label>
                          <textarea 
                            className="w-full px-1 py-0.5 text-[9px] border rounded bg-green-50/30 resize-none"
                            rows={3}
                            placeholder="振り返りを入力"
                            value={customer.monthlyPlans[month]?.reflection || ''}
                            onChange={(e) => updateBaseCustomer(customerIndex, {
                              monthlyPlans: {
                                ...customer.monthlyPlans,
                                [month]: {
                                  plan: customer.monthlyPlans[month]?.plan || '',
                                  reflection: e.target.value
                                }
                              }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {baseCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              CSV読み込み後、顧客データが表示されます
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ⓪ホームタブ
// カラーパレット: SPA水色ベース
// Primary: #5CB3D6 (SPA水色)
// Secondary: #3B8FA3 (深い青緑)
// Accent: #52B788 (トレナビグリーン)
function HomeTab() {
  const { spaFileName, torenaviFileName, setActiveTab, setCSVFiles } = useStore();
  const [spaFile, setSpaFile] = React.useState<File | null>(null);
  const [torenaviFile, setTorenaviFile] = React.useState<File | null>(null);
  const spaInputRef = React.useRef<HTMLInputElement>(null);
  const torenaviInputRef = React.useRef<HTMLInputElement>(null);

  const handleSpaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setSpaFile(file);
      setCSVFiles(file.name, torenaviFileName);
    } else if (file) {
      alert('CSVファイルを選択してください');
    }
  };

  const handleTorenaviUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setTorenaviFile(file);
      setCSVFiles(spaFileName, file.name);
    } else if (file) {
      alert('CSVファイルを選択してください');
    }
  };

  const handleExecute = () => {
    if (spaFile && torenaviFile) {
      console.log('CSVファイルを処理:', { spa: spaFile.name, torenavi: torenaviFile.name });
      setCSVFiles(spaFile.name, torenaviFile.name);
      // TODO: CSV処理ロジックを実装
      alert('データの読み込みを開始します\n（現在は機能未実装）');
      setActiveTab('vision');
    }
  };

  const canExecute = (spaFile !== null || spaFileName !== null) && (torenaviFile !== null || torenaviFileName !== null);
  const displaySpaName = spaFile?.name || spaFileName;
  const displayTorenaviName = torenaviFile?.name || torenaviFileName;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* タイトルエリア */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#5CB3D6' }}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#2E7D9A' }}>
              半期営業計画管理
            </h1>
            <button
              onClick={() => alert('【このツールについて】\n\nSPA・トレナビデータから定量・定性の計画・振り返りを効率化します。\n\n• 定量的な計画：数値目標の設定・管理\n• 定性的な計画：顧客戦略や施策の整理\n• 期中の振り返り：月次・半期の進捗確認\n• 顧客関係の整理：重点顧客・重点外顧客の管理')}
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold transition-colors cursor-pointer"
              title="使い方を見る"
            >
              ?
            </button>
          </div>

          {/* メインコンテンツ：縦配置 */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* CSVアップロードエリア */}
            <div className="space-y-3">
              {/* SPAデータ */}
              <div>
                <input
                  ref={spaInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleSpaUpload}
                  className="hidden"
                />
                <button
                  onClick={() => spaInputRef.current?.click()}
                  className={`w-full text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    displaySpaName ? 'ring-2 ring-offset-2 ring-cyan-400' : ''
                  }`}
                  style={{ 
                    backgroundColor: '#5CB3D6'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A9EC4'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5CB3D6'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>
                    {displaySpaName ? `✓ ${displaySpaName}` : 'SPAデータを読み込む'}
                  </span>
                </button>
              </div>

              {/* トレナビデータ */}
              <div>
                <input
                  ref={torenaviInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleTorenaviUpload}
                  className="hidden"
                />
                <button
                  onClick={() => torenaviInputRef.current?.click()}
                  className={`w-full text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    displayTorenaviName ? 'ring-2 ring-offset-2 ring-green-400' : ''
                  }`}
                  style={{ 
                    backgroundColor: '#52B788'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#449970'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#52B788'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>
                    {displayTorenaviName ? `✓ ${displayTorenaviName}` : 'トレナビデータを読み込む'}
                  </span>
                </button>
              </div>

              {/* 実行ボタン */}
              <button
                onClick={handleExecute}
                disabled={!canExecute}
                className={`w-full text-white font-bold py-3 px-8 rounded-xl text-base transition-all shadow-lg ${
                  canExecute 
                    ? 'hover:shadow-2xl cursor-pointer' 
                    : 'opacity-40 cursor-not-allowed'
                }`}
                style={{ 
                  backgroundColor: canExecute ? '#2E7D9A' : '#9CA3AF'
                }}
                onMouseEnter={(e) => {
                  if (canExecute) e.currentTarget.style.backgroundColor = '#1E5D7A';
                }}
                onMouseLeave={(e) => {
                  if (canExecute) e.currentTarget.style.backgroundColor = '#2E7D9A';
                }}
              >
                {canExecute ? '実行' : '2つのCSVファイルを選択してください'}
              </button>

              {/* 注意書き */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>データはブラウザにローカル保存されます</span>
                </div>
              </div>
            </div>

            {/* 既存データへのクイックアクセス */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">既存データを確認</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab('vision')}
                  className="py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                >
                  ①目指す姿
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className="py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                >
                  ②業績計画
                </button>
                <button
                  onClick={() => setActiveTab('focus')}
                  className="py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                >
                  ③重点顧客の活動計画
                </button>
                <button
                  onClick={() => setActiveTab('base')}
                  className="py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                >
                  ④重点外顧客の活動計画
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
