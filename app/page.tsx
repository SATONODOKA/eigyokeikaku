"use client";

import React from "react";
import { useStore } from "@/lib/store";
import * as XLSX from 'xlsx';

export default function Home() {
  const { activeTab, setActiveTab } = useStore();

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
        {activeTab === "home" && <HomeTab />}
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
                <td colSpan={showTreatAsA ? 6 : 5} className="border px-2 py-4 text-center text-gray-400 text-xs">
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
  const { performanceData, updatePerformanceData, saveData } = useStore();
  const [targetAmount, setTargetAmount] = React.useState(performanceData.targetAmount);
  const [currentAmount, setCurrentAmount] = React.useState(performanceData.currentAmount);
  const [cancelRisk, setCancelRisk] = React.useState(performanceData.cancelRisk);
  const [aYomiItems, setAYomiItems] = React.useState(performanceData.aYomiItems);
  const [bYomiItems, setBYomiItems] = React.useState(performanceData.bYomiItems);
  const [cYomiItems, setCYomiItems] = React.useState(performanceData.cYomiItems);
  const [netaYomiItems, setNetaYomiItems] = React.useState(performanceData.netaYomiItems);

  // ローカルstateの変更をZustandストアに自動同期
  React.useEffect(() => {
    updatePerformanceData({
      targetAmount,
      currentAmount,
      cancelRisk,
      aYomiItems,
      bYomiItems,
      cYomiItems,
      netaYomiItems
    });
  }, [targetAmount, currentAmount, cancelRisk, aYomiItems, bYomiItems, cYomiItems, netaYomiItems, updatePerformanceData]);

  // 計算ロジック（treatAsAフラグを考慮）
  // A扱いされるB/C案件の合計
  const bTreatAsATotal = bYomiItems.filter(item => item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  const cTreatAsATotal = cYomiItems.filter(item => item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  
  // 実際のA/B/C合計（treatAsAフラグに基づく）
  const aYomiTotal = aYomiItems.reduce((sum, item) => sum + item.amount, 0) + bTreatAsATotal + cTreatAsATotal;
  const bYomiTotal = bYomiItems.filter(item => !item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  const cYomiTotal = cYomiItems.filter(item => !item.treatAsA).reduce((sum, item) => sum + item.amount, 0);
  const netaYomiTotal = netaYomiItems.reduce((sum, item) => sum + item.amount, 0);

  const aYomiExpected = currentAmount + aYomiTotal * 0.9;
  const abYomiExpected = currentAmount + aYomiTotal * 0.9 + bYomiTotal * 0.4;
  const abcYomiExpected = currentAmount + aYomiTotal * 0.9 + bYomiTotal * 0.4 + cYomiTotal * 0.1;

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
                       ? 'bg-cyan-600 text-white hover:bg-cyan-700' 
                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                   }`}
                 >
                   保存
                 </button>
        </div>

        {/* 目標設定 */}
        <div className="mb-3 p-3 bg-cyan-50 rounded-lg">
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

        {/* 見込み額と必要額の計算 - 横並び */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          {/* 見込み額 */}
          <div className="p-2 bg-cyan-50 rounded-lg">
            <h3 className="text-xs font-semibold mb-1">見込み額</h3>
            <div className="grid grid-cols-3 gap-1 text-[10px]">
              <div>
                <div className="text-gray-700">Aヨミ</div>
                <div className="text-base font-bold text-cyan-700">{aYomiExpected.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-700">A+B</div>
                <div className="text-base font-bold text-cyan-700">{abYomiExpected.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-700">A+B+C</div>
                <div className="text-base font-bold text-cyan-700">{abcYomiExpected.toLocaleString()}</div>
              </div>
              </div>
            </div>

          {/* 必要額の計算 */}
          <div className="p-2 bg-cyan-50 rounded-lg">
            <h3 className="text-xs font-semibold mb-1">必要額の計算</h3>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              <div>
                <div className="text-gray-700">新規受注額</div>
                <div className="text-base font-bold text-cyan-700">{requiredNewOrders.toLocaleString()}</div>
                </div>
              <div>
                <div className="text-gray-700">新規提案額</div>
                <div className="text-base font-bold text-cyan-700">{requiredNewProposals.toLocaleString()}</div>
              </div>
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
          bgColor="bg-gray-100"
          total={netaYomiTotal}
          showTreatAsA={false}
        />
      </div>
    </div>
  );
}

// Focus タブ
function FocusTab() {
  const { focusCustomers, selectedCustomerIndex, setSelectedCustomerIndex, updateCustomerData, deleteFocusCustomer, saveData } = useStore();
  const months = ["10月", "11月", "12月", "1月", "2月", "3月"];
  
  // 顧客が登録されていない場合
  if (focusCustomers.length === 0) {
    return (
      <div className="h-[calc(100vh-140px)]">
        <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">まだ重点顧客が登録されていません</h3>
            <p className="text-gray-500 text-sm mb-4">
              ④重点外顧客タブから「重点顧客にする」ボタンで追加できます
            </p>
            <div className="mt-6 p-4 bg-teal-50 rounded-lg text-left max-w-md">
              <p className="text-xs text-gray-600 mb-2">💡 使い方：</p>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. ④重点外顧客タブを開く</li>
                <li>2. 重点的に管理したい顧客の行にある「重点顧客にする」ボタンをクリック</li>
                <li>3. この画面（③重点顧客）に追加されます</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const currentCustomer = focusCustomers[selectedCustomerIndex];
  
  // textarea自動リサイズ
  const handleTextareaResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };
  
  // 重点顧客を削除
  const handleDeleteCustomer = () => {
    if (confirm(`${currentCustomer.name}を重点顧客から削除しますか？`)) {
      deleteFocusCustomer(selectedCustomerIndex);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow h-full flex flex-col">
        {/* 顧客タブ */}
        <div className="border-b flex-shrink-0">
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex space-x-1">
            {focusCustomers.map((customer, index) => (
              <div key={index} className="relative group">
              <button
                onClick={() => setSelectedCustomerIndex(index)}
                className={`px-3 py-1.5 rounded-t-lg font-medium text-sm ${
                  selectedCustomerIndex === index
                        ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {customer.name}
              </button>
                {selectedCustomerIndex === index && (
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => updateCustomerData(index, { name: e.target.value })}
                      className="absolute top-0 left-0 w-full px-3 py-1.5 rounded-t-lg font-medium text-sm bg-teal-500 text-white border-0 focus:outline-none focus:ring-2 focus:ring-teal-600 opacity-0 hover:opacity-100 focus:opacity-100"
                    placeholder="顧客名"
                  />
                )}
              </div>
            ))}
          </div>
            <div className="flex gap-2 mb-1">
                      <button
                onClick={handleDeleteCustomer}
                className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded border border-red-300"
                      >
                削除
                      </button>
                      <button
                onClick={saveData}
                className="px-3 py-1 text-xs bg-teal-600 text-white rounded hover:bg-teal-700"
                      >
                保存
                      </button>
                </div>
              </div>
                </div>

        {/* 2カラムレイアウト */}
        <div className="flex-1 grid lg:grid-cols-2 grid-cols-1 gap-0 overflow-hidden">
          {/* 左側：中長期 + 今半期ゴール + 営業活動の焦点 */}
          <div className="border-r flex flex-col overflow-y-auto p-4 space-y-4">
            {/* 左上：中長期の目指す状態 */}
            <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
              <h3 className="font-semibold text-sm text-teal-900 mb-3">中長期の目指す状態</h3>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">3年後</label>
                  <textarea
                    value={currentCustomer.threeYearGoal || ''}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { threeYearGoal: e.target.value })}
                    onInput={handleTextareaResize}
                    className="w-full p-2 text-xs border border-teal-200 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden bg-white"
                    rows={2}
                    placeholder="3年後の目指す状態..."
                  />
              </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">1年後</label>
                  <textarea
                    value={currentCustomer.oneYearGoal || ''}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { oneYearGoal: e.target.value })}
                    onInput={handleTextareaResize}
                    className="w-full p-2 text-xs border border-teal-200 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden bg-white"
                    rows={2}
                    placeholder="1年後の目指す状態..."
                  />
            </div>
            </div>
          </div>

            {/* 左中：今半期のゴール状態をイメージ */}
            <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
              <h3 className="text-sm font-semibold text-teal-900 mb-3">今半期のゴール状態をイメージ</h3>
              
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">① 人・関係性</label>
                  <textarea
                    value={currentCustomer.termGoalPeople || ''}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { termGoalPeople: e.target.value })}
                    onInput={handleTextareaResize}
                    className="w-full p-2 text-xs border border-teal-200 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden bg-white"
                    rows={2}
                    placeholder="人材開発部の●●様と継続的な接点を持ち、信頼関係を構築..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">② 取引</label>
                  <textarea
                    value={currentCustomer.termGoalBusiness || ''}
                    onChange={(e) => updateCustomerData(selectedCustomerIndex, { termGoalBusiness: e.target.value })}
                    onInput={handleTextareaResize}
                    className="w-full p-2 text-xs border border-teal-200 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden bg-white"
                    rows={2}
                    placeholder="新規部署への提案2件、契約額500万円以上..."
                  />
                </div>
                </div>
                </div>
                
            {/* 左下：今半期の営業活動の焦点 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">今半期の営業活動の焦点</h3>
              
                <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">現状を直視する</label>
                  <textarea
                  value={currentCustomer.currentSituation || ''}
                  onChange={(e) => updateCustomerData(selectedCustomerIndex, { currentSituation: e.target.value })}
                  onInput={handleTextareaResize}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden"
                  rows={2}
                  placeholder="連続合計5,000万以上の取引があるが..."
                  />
                </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">この半期の肝はココ</label>
                <textarea
                  value={currentCustomer.termKeyPoint || ''}
                  onChange={(e) => updateCustomerData(selectedCustomerIndex, { termKeyPoint: e.target.value })}
                  onInput={handleTextareaResize}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden"
                  rows={2}
                  placeholder="年末年始を挟む＆報告会..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">現時点で持っている機会</label>
                <textarea
                  value={currentCustomer.currentOpportunities || ''}
                  onChange={(e) => updateCustomerData(selectedCustomerIndex, { currentOpportunities: e.target.value })}
                  onInput={handleTextareaResize}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden"
                  rows={2}
                  placeholder="人材開発部門の●●課長と接点がある..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">今期のゴールに向けた大きなシナリオ</label>
                <textarea
                  value={currentCustomer.termScenario || ''}
                  onChange={(e) => updateCustomerData(selectedCustomerIndex, { termScenario: e.target.value })}
                  onInput={handleTextareaResize}
                  className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden"
                  rows={3}
                  placeholder="ゴールされた奇跡の成果を分かりポイントゴールに向けたシナリオを記入..."
                />
              </div>
            </div>
          </div>

          {/* 右側：過去イベント履歴 + 月次計画 */}
          <div className="flex flex-col overflow-hidden">
            {/* 右上：過去イベント履歴（固定高） */}
            <div className="h-64 flex flex-col border-b">
              <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                <h3 className="font-semibold text-sm">過去イベント・活動履歴</h3>
                <p className="text-xs text-gray-500 mt-1">直近1年分（37上・37下）の受注履歴</p>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {/* 取引履歴をカード形式で表示（直近1年分のみ） */}
              {(currentCustomer.transactionHistory || [])
                .filter(tx => tx.period.includes('37'))  // 37上・37下のみ表示
                .map((tx, idx) => (
                  <div key={idx} className="border rounded-lg p-2 bg-white shadow-sm hover:shadow-md transition-shadow">
                    {/* 1行目：受注年月 + 期ラベル */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono text-gray-600">{tx.date}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        tx.period.includes('上') ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {tx.period}
                      </span>
                    </div>
                    {/* 2行目：商品名と取引額 */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-800 font-medium truncate flex-1">{tx.productName || '商品名なし'}</span>
                      <span className="text-xs font-bold text-gray-900 ml-2">{tx.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              {(currentCustomer.transactionHistory || []).filter(tx => tx.period.includes('37')).length === 0 && (
                <div className="text-center text-gray-400 text-xs mt-8 py-4">
                  <p>直近1年分の取引履歴はありません</p>
                  <p className="text-[10px] mt-1">期初データ読み込みで自動反映されます</p>
                </div>
              )}
            </div>
            </div>

            {/* 右下：月次計画（たっぷりスペース） */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-4">月次計画</h3>
                <div className="space-y-2">
                  {months.map((month) => (
                    <div key={month} className="border rounded p-3 bg-gray-50">
                      <div className="font-semibold text-sm mb-2">{month}</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">目標・アクション</label>
                        <textarea
                            className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden"
                            rows={2}
                            placeholder="このを月に行うこと..."
                          value={currentCustomer.monthlyPlans[month]?.goal || ''}
                            onInput={handleTextareaResize}
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
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">振り返り</label>
                        <textarea
                            className="w-full p-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-teal-500 resize-none overflow-hidden"
                            rows={2}
                            placeholder="月末に振り返りを記入..."
                          value={currentCustomer.monthlyPlans[month]?.reflection || ''}
                            onInput={handleTextareaResize}
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
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Base タブ
function BaseTab() {
  const { baseCustomers, updateBaseCustomer, addBaseCustomer, deleteBaseCustomer, addFocusCustomerFromBase, saveData, setActiveTab } = useStore();

  const handleDeleteCustomer = (index: number) => {
    if (confirm('この顧客を削除してもよろしいですか？')) {
      deleteBaseCustomer(index);
    }
  };

  const handlePromoteToFocus = (index: number) => {
    const customer = baseCustomers[index];
    if (confirm(`${customer.name}を重点顧客に追加しますか？`)) {
      addFocusCustomerFromBase(customer);
      alert(`${customer.name}を③重点顧客の活動計画に追加しました！`);
      setActiveTab('focus');
    }
  };

  // テキストエリアの高さを自動調整
  const handleTextareaResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-3 h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">④重点外顧客の活動計画</h2>
          <div className="flex gap-2">
            <button 
              onClick={addBaseCustomer}
              className="px-4 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700"
            >
              + 顧客追加
            </button>
            <button 
              onClick={saveData}
              className="px-4 py-1.5 text-xs bg-cyan-600 text-white rounded hover:bg-cyan-700"
            >
              保存
            </button>
          </div>
        </div>

        {/* テーブル形式 */}
        <div className="flex-1 overflow-auto">
          <table className="text-xs border-collapse border min-w-max">
            <thead className="bg-cyan-50 sticky top-0 z-10">
              <tr>
                <th className="border px-2 py-1 text-left font-medium w-40" rowSpan={2}>社名</th>
                <th className="border px-2 py-1 text-center font-medium bg-gray-100" colSpan={6}>実績（期初データより）</th>
                <th className="border px-2 py-1 text-center font-medium" colSpan={2}>受注済み額</th>
                <th className="border px-2 py-1 text-center font-medium" colSpan={3}>今期の目指す状態</th>
                <th className="border px-2 py-1 text-center font-medium w-80" rowSpan={2}>半期後の<br/>振り返り</th>
                <th className="border px-1 py-1 text-center font-medium w-16" rowSpan={2}>操作</th>
              </tr>
              <tr>
                <th className="border px-1 py-1 text-center text-xs bg-gray-100 w-16">36上</th>
                <th className="border px-1 py-1 text-center text-xs bg-gray-100 w-16">36下</th>
                <th className="border px-1 py-1 text-center text-xs bg-gray-100 w-16">37上</th>
                <th className="border px-1 py-1 text-center text-xs bg-gray-100 w-16">37下</th>
                <th className="border px-1 py-1 text-center text-xs bg-gray-100 w-16">38上</th>
                <th className="border px-1 py-1 text-center text-xs bg-gray-100 w-16">38下</th>
                <th className="border px-1 py-1 text-center text-xs w-16">37下期<br/>受注済</th>
                <th className="border px-1 py-1 text-center text-xs w-16">38上期<br/>受注済</th>
                <th className="border px-2 py-1 text-left text-xs w-80">どんな状態に<br/>なっていればOK</th>
                <th className="border px-2 py-1 text-left text-xs w-80">今ある商品<br/>・商談</th>
                <th className="border px-2 py-1 text-left text-xs w-80">活動の<br/>焦点</th>
              </tr>
            </thead>
            <tbody>
              {baseCustomers.map((customer, customerIndex) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  {/* 社名 */}
                  <td className="border px-2 py-1">
                    <textarea 
                    value={customer.name}
                      onChange={(e) => updateBaseCustomer(customerIndex, { name: e.target.value })}
                      onInput={handleTextareaResize}
                      className="w-full px-2 py-1 text-xs border-0 focus:ring-1 focus:ring-cyan-500 rounded bg-cyan-50 resize-none overflow-hidden"
                      rows={2}
                      placeholder="社名"
                    />
                  </td>
                  {/* 実績（半期ごと） */}
                  <td className="border px-1 py-1 bg-gray-50">
                    <div className="w-full px-1 py-1 text-xs text-right bg-gray-100">
                      {customer.record36First}
                    </div>
                  </td>
                  <td className="border px-1 py-1 bg-gray-50">
                    <div className="w-full px-1 py-1 text-xs text-right bg-gray-100">
                      {customer.record36Second}
                    </div>
                  </td>
                  <td className="border px-1 py-1 bg-gray-50">
                    <div className="w-full px-1 py-1 text-xs text-right bg-gray-100">
                      {customer.record37First}
                    </div>
                  </td>
                  <td className="border px-1 py-1 bg-gray-50">
                    <div className="w-full px-1 py-1 text-xs text-right bg-gray-100">
                      {customer.record37Second}
                    </div>
                  </td>
                  <td className="border px-1 py-1 bg-gray-50">
                    <div className="w-full px-1 py-1 text-xs text-right bg-gray-100">
                      {customer.record38First}
                    </div>
                  </td>
                  <td className="border px-1 py-1 bg-gray-50">
                    <div className="w-full px-1 py-1 text-xs text-right bg-gray-100">
                      {customer.record38Second}
                    </div>
                  </td>
                  {/* 受注済み額 */}
                  <td className="border px-1 py-1">
                    <div className="w-full px-1 py-1 text-xs text-right bg-yellow-50">
                      {customer.order37Second}
                    </div>
                  </td>
                  <td className="border px-1 py-1">
                    <div className="w-full px-1 py-1 text-xs text-right bg-yellow-50">
                      {customer.order38First}
                    </div>
                  </td>
                  {/* 今期の目指す状態 */}
                  <td className="border px-2 py-1">
                  <textarea 
                      value={customer.targetState}
                      onChange={(e) => updateBaseCustomer(customerIndex, { targetState: e.target.value })}
                      onInput={handleTextareaResize}
                      className="w-full px-2 py-1 text-xs border-0 focus:ring-1 focus:ring-cyan-500 rounded resize-none overflow-hidden"
                      rows={3}
                      placeholder="どんな状態になっていればOK..."
                  />
                  </td>
                  <td className="border px-2 py-1">
                  <textarea 
                      value={customer.currentProducts}
                      onChange={(e) => updateBaseCustomer(customerIndex, { currentProducts: e.target.value })}
                      onInput={handleTextareaResize}
                      className="w-full px-2 py-1 text-xs border-0 focus:ring-1 focus:ring-cyan-500 rounded resize-none overflow-hidden"
                      rows={3}
                      placeholder="今ある商品・商談..."
                  />
                  </td>
                  <td className="border px-2 py-1">
                  <textarea 
                      value={customer.activityFocus}
                      onChange={(e) => updateBaseCustomer(customerIndex, { activityFocus: e.target.value })}
                      onInput={handleTextareaResize}
                      className="w-full px-2 py-1 text-xs border-0 focus:ring-1 focus:ring-cyan-500 rounded resize-none overflow-hidden"
                      rows={3}
                      placeholder="活動の焦点..."
                    />
                  </td>
                  {/* 半期後の振り返り */}
                  <td className="border px-2 py-1">
                    <textarea 
                      value={customer.termReview}
                      onChange={(e) => updateBaseCustomer(customerIndex, { termReview: e.target.value })}
                      onInput={handleTextareaResize}
                      className="w-full px-2 py-1 text-xs border-0 focus:ring-1 focus:ring-cyan-500 rounded resize-none overflow-hidden"
                      rows={3}
                      placeholder="半期後の振り返り..."
                    />
                  </td>
                  {/* 操作ボタン */}
                  <td className="border px-1 py-1 text-center">
                    <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleDeleteCustomer(customerIndex)}
                        className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded whitespace-nowrap"
                      title="削除"
                    >
                      削除
                    </button>
                      <button
                        onClick={() => handlePromoteToFocus(customerIndex)}
                        className="px-2 py-1 text-xs text-cyan-600 hover:bg-cyan-50 rounded whitespace-nowrap"
                        title="重点顧客にする"
                      >
                        重点顧客<br/>にする
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {baseCustomers.length === 0 && (
                <tr>
                  <td colSpan={15} className="border px-2 py-8 text-center text-gray-400 text-xs">
                    「+ 顧客追加」ボタンで顧客を追加してください
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
  const { 
    spaFileName, 
    torenaviFileName, 
    setActiveTab, 
    setCSVFiles, 
    exportData, 
    importData,
    setPerformanceItems,
    setBaseCustomers 
  } = useStore();
  const [spaFile, setSpaFile] = React.useState<File | null>(null);
  const [torenaviFile, setTorenaviFile] = React.useState<File | null>(null);
  const spaInputRef = React.useRef<HTMLInputElement>(null);
  const torenaviInputRef = React.useRef<HTMLInputElement>(null);
  const backupInputRef = React.useRef<HTMLInputElement>(null);

  const handleSpaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setSpaFile(file);
      setCSVFiles(file.name, torenaviFileName);
    } else if (file) {
      alert('Excelファイル（.xlsx）を選択してください');
    }
  };

  const handleTorenaviUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setTorenaviFile(file);
      setCSVFiles(spaFileName, file.name);
    } else if (file) {
      alert('Excelファイル（.xlsx）を選択してください');
    }
  };

  const handleExecute = async () => {
    try {
      let successMessages: string[] = [];

      // 1. 業績計画用レポート（SPAデータ）の処理
      if (spaFile) {
        const data = await spaFile.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // ヘッダー行を探す（15行目付近）
        let headerRowIndex = -1;
        for (let i = 0; i < Math.min(20, jsonData.length); i++) {
          const row = jsonData[i];
          if (row && typeof row[1] === 'string' && row[1].includes('営業担当者')) {
            headerRowIndex = i;
            break;
          }
        }

        if (headerRowIndex !== -1) {
          const dataRows = jsonData.slice(headerRowIndex + 1);
          const aYomiItems: any[] = [];
          const bYomiItems: any[] = [];
          const cYomiItems: any[] = [];
          const netaItems: any[] = [];

          dataRows.forEach((row: any) => {
            if (!row || row.length < 8) return;
            
            const company = row[4] || '';
            const project = row[5] || '';
            const probability = row[6] || '';
            const amountStr = row[7] || '';
            const expectedDate = row[8] || '';

            if (!company && !project && !probability) return;

            let amount = 0;
            if (amountStr) {
              const numStr = String(amountStr).replace(/[^0-9]/g, '');
              amount = numStr ? parseInt(numStr, 10) : 0;
            }

            let formattedDate = '';
            if (expectedDate) {
              if (typeof expectedDate === 'number') {
                const date = XLSX.SSF.parse_date_code(expectedDate);
                formattedDate = `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
              } else if (typeof expectedDate === 'string') {
                formattedDate = expectedDate.replace(/\//g, '-');
              }
            }

            const item = {
              id: `${Date.now()}-${Math.random()}`,
              company,
              project,
              amount,
              expectedDate: formattedDate
            };

            const prob = String(probability).toLowerCase();
            if (prob.includes('aヨミ') || prob.includes('a ヨミ')) {
              aYomiItems.push(item);
            } else if (prob.includes('bヨミ') || prob.includes('b ヨミ')) {
              bYomiItems.push(item);
            } else if (prob.includes('cヨミ') || prob.includes('c ヨミ')) {
              cYomiItems.push(item);
            } else if (prob.includes('ネタ') || prob.includes('ねた')) {
              netaItems.push(item);
            }
          });

          setPerformanceItems({
            aYomi: aYomiItems,
            bYomi: bYomiItems,
            cYomi: cYomiItems,
            neta: netaItems
          });

          successMessages.push(`②業績計画: Bヨミ${bYomiItems.length}件、Cヨミ${cYomiItems.length}件、ネタ${netaItems.length}件`);
        }
      }

      // 2. 期初データの処理
      if (torenaviFile) {
        const data = await torenaviFile.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        console.log('📊 Excelファイル読み込み開始（セルアドレス方式）');
        
        // セルから期ラベルを取得（5行目 = row 5）
        const periodLabels = {
          m: worksheet['M5']?.v || '36上',
          n: worksheet['N5']?.v || '36下',
          o: worksheet['O5']?.v || '37上',
          p: worksheet['P5']?.v || '37下',
          q: worksheet['Q5']?.v || '38上',
          r: worksheet['R5']?.v || '38下'
        };
        
        console.log('📊 期ラベル:', periodLabels);
        
        // worksheet.['!ref']から最終行を取得
        const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
        const lastRow = range.e.r; // 最終行番号（0始まり）
        
        console.log('📊 データ行数:', lastRow - 4);
        
        // 会社名ごとにデータを集計 + 取引履歴
        const companyData: Map<string, {
          m: number[], n: number[], o: number[], p: number[], q: number[], r: number[],
          transactions: Array<{ date: string, period: string, productName: string, amount: number }>
        }> = new Map();

        // 6行目から最終行までループ（row 6 = インデックス5）
        for (let rowIdx = 5; rowIdx <= lastRow; rowIdx++) {
          const rowNum = rowIdx + 1; // Excelの行番号（1始まり）
          
          // セルアドレスでデータを取得
          const companyName = worksheet[`F${rowNum}`]?.v || '';
          if (!companyName || companyName === '-') continue;

          const productName = worksheet[`K${rowNum}`]?.v || '';

          // M～R列の金額データ
          const m = Number(worksheet[`M${rowNum}`]?.v) || 0;
          const n = Number(worksheet[`N${rowNum}`]?.v) || 0;
          const o = Number(worksheet[`O${rowNum}`]?.v) || 0;
          const p = Number(worksheet[`P${rowNum}`]?.v) || 0;
          const q = Number(worksheet[`Q${rowNum}`]?.v) || 0;
          const r = Number(worksheet[`R${rowNum}`]?.v) || 0;

          // AA～AF列の受注年月
          const dateM = String(worksheet[`AA${rowNum}`]?.v || '');
          const dateN = String(worksheet[`AB${rowNum}`]?.v || '');
          const dateO = String(worksheet[`AC${rowNum}`]?.v || '');
          const dateP = String(worksheet[`AD${rowNum}`]?.v || '');
          const dateQ = String(worksheet[`AE${rowNum}`]?.v || '');
          const dateR = String(worksheet[`AF${rowNum}`]?.v || '');

          // デバッグ: 最初の3行のみログ出力
          if (rowIdx <= 7) {
            console.log(`📊 行${rowNum}:`, {
              companyName,
              productName,
              amounts: { m, n, o, p, q, r }
            });
            console.log(`  dates:`, `M=${dateM}, N=${dateN}, O=${dateO}, P=${dateP}, Q=${dateQ}, R=${dateR}`);
            
            // 実際に生成されるカードを確認
            const cards = [];
            if (m > 0 && dateM && dateM !== '-') cards.push(`${periodLabels.m}:${productName}:${dateM}:${m}`);
            if (n > 0 && dateN && dateN !== '-') cards.push(`${periodLabels.n}:${productName}:${dateN}:${n}`);
            if (o > 0 && dateO && dateO !== '-') cards.push(`${periodLabels.o}:${productName}:${dateO}:${o}`);
            if (p > 0 && dateP && dateP !== '-') cards.push(`${periodLabels.p}:${productName}:${dateP}:${p}`);
            if (q > 0 && dateQ && dateQ !== '-') cards.push(`${periodLabels.q}:${productName}:${dateQ}:${q}`);
            if (r > 0 && dateR && dateR !== '-') cards.push(`${periodLabels.r}:${productName}:${dateR}:${r}`);
            if (cards.length > 0) {
              console.log(`  生成されるカード:`, cards);
            } else {
              console.log(`  生成されるカード: なし（条件不一致）`);
            }
          }

          if (!companyData.has(companyName)) {
            companyData.set(companyName, { m: [], n: [], o: [], p: [], q: [], r: [], transactions: [] });
          }

          const company = companyData.get(companyName)!;
          company.m.push(m);
          company.n.push(n);
          company.o.push(o);
          company.p.push(p);
          company.q.push(q);
          company.r.push(r);

          // 取引履歴を追加（金額があり、受注年月がある場合のみ、かつ"-"でない場合）
          if (m > 0 && dateM && dateM !== '-') company.transactions.push({ date: dateM, period: periodLabels.m, productName: productName || '商品名なし', amount: m });
          if (n > 0 && dateN && dateN !== '-') company.transactions.push({ date: dateN, period: periodLabels.n, productName: productName || '商品名なし', amount: n });
          if (o > 0 && dateO && dateO !== '-') company.transactions.push({ date: dateO, period: periodLabels.o, productName: productName || '商品名なし', amount: o });
          if (p > 0 && dateP && dateP !== '-') company.transactions.push({ date: dateP, period: periodLabels.p, productName: productName || '商品名なし', amount: p });
          if (q > 0 && dateQ && dateQ !== '-') company.transactions.push({ date: dateQ, period: periodLabels.q, productName: productName || '商品名なし', amount: q });
          if (r > 0 && dateR && dateR !== '-') company.transactions.push({ date: dateR, period: periodLabels.r, productName: productName || '商品名なし', amount: r });
        }

        // デバッグ: 取引履歴の確認
        console.log('📊 会社別取引履歴の数:');
        companyData.forEach((data, companyName) => {
          console.log(`  ${companyName}: ${data.transactions.length}件`);
          if (data.transactions.length > 0) {
            console.log('    最初の取引:', data.transactions[0]);
          }
        });

        // BaseCustomerリストを作成
        const baseCustomers: any[] = [];
        companyData.forEach((data, companyName) => {
          const sumM = data.m.reduce((a, b) => a + b, 0);
          const sumN = data.n.reduce((a, b) => a + b, 0);
          const sumO = data.o.reduce((a, b) => a + b, 0);
          const sumP = data.p.reduce((a, b) => a + b, 0);
          const sumQ = data.q.reduce((a, b) => a + b, 0);
          const sumR = data.r.reduce((a, b) => a + b, 0);

          // 取引履歴を新しい順にソート（YYMM形式なので数値比較）
          const sortedTransactions = data.transactions.sort((a, b) => {
            const dateA = parseInt(a.date) || 0;
            const dateB = parseInt(b.date) || 0;
            return dateB - dateA;  // 新しい順
          });

          baseCustomers.push({
            id: `${Date.now()}-${Math.random()}`,
            name: companyName,
            record36First: String(sumM),    // 36上
            record36Second: String(sumN),   // 36下
            record37First: String(sumO),    // 37上
            record37Second: String(sumP),   // 37下
            record38First: String(sumQ),    // 38上
            record38Second: String(sumR),   // 38下
            order37Second: String(sumP),    // 37下期受注済
            order38First: String(sumQ),     // 38上期受注済
            transactionHistory: sortedTransactions,
            term37Target: '',
            term38Target: '',
            targetState: '',
            currentProducts: '',
            activityFocus: '',
            termReview: ''
          });
        });

        console.log('📊 BaseCustomers作成完了:', baseCustomers.length, '社');
        if (baseCustomers.length > 0) {
          console.log('📊 最初の顧客の取引履歴:', baseCustomers[0].transactionHistory);
        }

        setBaseCustomers(baseCustomers);
        successMessages.push(`④重点外顧客: ${baseCustomers.length}社`);
      }

      if (successMessages.length > 0) {
        alert(`✅ データを読み込みました！\n\n${successMessages.join('\n')}`);
        setActiveTab(torenaviFile ? 'base' : 'performance');
      } else {
        alert('ファイルを選択してください');
      }

    } catch (error) {
      console.error('Excelファイルの読み込みエラー:', error);
      alert('Excelファイルの読み込みに失敗しました。\n正しい形式のファイルを選択してください。');
    }
  };

  const handleBackupImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonString = event.target?.result as string;
        importData(jsonString);
      };
      reader.readAsText(file);
    } else if (file) {
      alert('JSONファイルを選択してください');
    }
  };

  const canExecute = spaFile !== null || torenaviFile !== null;
  const displaySpaName = spaFile?.name || spaFileName;
  const displayTorenaviName = torenaviFile?.name || torenaviFileName;

  return (
    <div className="h-[calc(100vh-140px)]">
      <div className="bg-white rounded-lg shadow p-6 h-full overflow-y-auto flex items-center justify-center">
        {/* Excelアップロードエリア */}
        <div className="space-y-4 max-w-2xl w-full">
          {/* 業績計画用レポート（SPAデータ） */}
                        <div>
            <input
              ref={spaInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleSpaUpload}
              className="hidden"
            />
            <button
              onClick={() => spaInputRef.current?.click()}
              className="w-full text-white font-medium py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3"
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
                {displaySpaName ? `✓ ${displaySpaName}` : '業績計画用レポートを読み込む（Excel）'}
              </span>
            </button>
                        </div>

          {/* 期初データ */}
                        <div>
            <input
              ref={torenaviInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleTorenaviUpload}
              className="hidden"
            />
            <button
              onClick={() => torenaviInputRef.current?.click()}
              className="w-full text-white font-medium py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3"
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
                {displayTorenaviName ? `✓ ${displayTorenaviName}` : '期初データを読み込む（Excel）'}
              </span>
            </button>
                        </div>

          {/* 実行ボタン */}
          <button
            onClick={handleExecute}
            disabled={!canExecute}
            className={`w-full font-medium py-4 px-6 rounded-lg transition-all ${
              canExecute 
                ? 'cursor-pointer hover:bg-gray-400' 
                : 'cursor-not-allowed'
            }`}
            style={{ 
              backgroundColor: canExecute ? '#D1D5DB' : '#E5E7EB',
              color: canExecute ? '#374151' : '#9CA3AF'
            }}
          >
            {canExecute ? '✅ 実行：データを読み込む' : 'Excelファイルを選択してください'}
          </button>

          {/* バックアップ機能 */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">📁 データのバックアップ</h3>
            <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
              {/* エクスポート */}
              <button
                onClick={exportData}
                className="py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-cyan-600 text-white hover:bg-cyan-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>バックアップを保存</span>
              </button>

              {/* インポート */}
              <div>
                <input
                  ref={backupInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleBackupImport}
                  className="hidden"
                />
                <button
                  onClick={() => backupInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>バックアップから復元</span>
                </button>
                      </div>
                    </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              定期的にバックアップを保存し、ローカルフォルダに保管することをお勧めします
            </p>
                </div>

          {/* 注意書き */}
          <div className="pt-4 mt-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>データはブラウザにローカル保存されます</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
