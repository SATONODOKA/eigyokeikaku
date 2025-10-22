import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';

export type Tab = 'home' | 'vision' | 'performance' | 'focus' | 'base';

interface VisionData {
  achieved: string;
  notAchieved: string;
  futureGoal: string;
  termMeaning: string;
  quantitativeGoal: string;
  qualitativeGoal: string;
  stance: string;
  memberExpectations: string;
}

export interface PerformanceItem {
  id: string;
  company: string;
  project: string;
  probability: string;
  amount: number;
  expectedDate: string;
  treatAsA?: boolean; // B/CヨミをA扱いにするフラグ
}

interface PerformanceData {
  targetAmount: number;
  currentAmount: number;
  cancelRisk: number;
  // 今期売上
  currentTermAYomi: PerformanceItem[];
  currentTermBYomi: PerformanceItem[];
  currentTermCYomi: PerformanceItem[];
  currentTermNeta: PerformanceItem[];
  // 来期受注
  nextTermAYomi: PerformanceItem[];
  nextTermBYomi: PerformanceItem[];
  nextTermCYomi: PerformanceItem[];
  nextTermNeta: PerformanceItem[];
}

interface CustomerData {
  id: string;
  name: string;
  // 中長期の目指す状態
  threeYearGoal: string;
  oneYearGoal: string;
  termGoalPeople: string;      // 今半期のゴール（人・関係性）
  termGoalBusiness: string;    // 今半期のゴール（取引）
  // 今半期の営業活動の焦点
  currentSituation: string;    // 現状を直視する
  termKeyPoint: string;        // この半期の肝はココ
  currentOpportunities: string; // 現時点で持っている機会
  termScenario: string;        // 今期のゴールに向けた大きなシナリオ
  // 月次計画
  monthlyPlans: {
    [month: string]: {
      goal: string;
      reflection: string;
    };
  };
  termReview: string;
  // 取引履歴（期初データから自動生成）
  transactionHistory: Array<{
    date: string;        // 受注年月（4桁：YYMM）
    period: string;      // 期ラベル（例：「37上」）
    productName: string; // 商品名
    amount: number;      // 取引額（千円）
  }>;
  // 互換性のため残す（非推奨）
  events?: Array<{
    date: string;
    type: string;
    content: string;
    source: string;
  }>;
  relationLevel?: string;
  quantitativeGoal?: string;
  qualitativeGoal?: string;
}

interface BaseCustomer {
  id: string;
  name: string;
  // CSV読み込み項目（実績 - 半期ごとの売上実績）
  record36First: string;   // 36上
  record36Second: string;  // 36下
  record37First: string;   // 37上
  record37Second: string;  // 37下
  record38First: string;   // 38上
  record38Second: string;  // 38下
  // 受注済み額
  order37Second: string;   // 37下期受注済
  order38First: string;    // 38上期受注済
  // 取引履歴（期初データから自動生成）
  transactionHistory: Array<{
    date: string;        // 受注年月（4桁：YYMM）
    period: string;      // 期ラベル（例：「37上」）
    productName: string; // 商品名
    amount: number;      // 取引額（千円）
  }>;
  // 手入力項目
  term37Target: string;
  term38Target: string;
  targetState: string;     // どんな状態になっていればOKか
  currentProducts: string; // 今ある商品・商談
  activityFocus: string;   // 活動の焦点
  termReview: string;      // 半期後の振り返り
}

interface AppState {
  // UI状態
  activeTab: Tab;
  selectedCustomerIndex: number;
  
  // CSVファイル状態
  spaFileName: string | null;
  torenaviFileName: string | null;
  
  // データ
  visionData: VisionData;
  performanceData: PerformanceData;
  focusCustomers: CustomerData[];
  baseCustomers: BaseCustomer[];
  
  // アクション
  setActiveTab: (tab: Tab) => void;
  setSelectedCustomerIndex: (index: number) => void;
  setCSVFiles: (spaFileName: string | null, torenaviFileName: string | null) => void;
  updateVisionData: (data: Partial<VisionData>) => void;
  updateCustomerData: (index: number, data: Partial<CustomerData>) => void;
  updateBaseCustomer: (index: number, data: Partial<BaseCustomer>) => void;
  addBaseCustomer: () => void;
  deleteBaseCustomer: (index: number) => void;
  setBaseCustomers: (customers: BaseCustomer[]) => void;
  addFocusCustomerFromBase: (baseCustomer: BaseCustomer) => void;
  deleteFocusCustomer: (index: number) => void;
  updatePerformanceData: (data: Partial<PerformanceData>) => void;
  setPerformanceItems: (items: {
    aYomi: PerformanceItem[];
    bYomi: PerformanceItem[];
    cYomi: PerformanceItem[];
    neta: PerformanceItem[];
  }, termType: 'current' | 'next') => void;
  saveData: () => void;
  exportData: () => void;
  importData: (jsonString: string) => void;
}

// IndexedDB用のカスタムストレージ
const indexedDBStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await idbGet(name);
    return value || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await idbSet(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await idbDel(name);
  },
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初期状態（空のデータ）
      activeTab: 'home',
      selectedCustomerIndex: 0,
      
      // CSVファイル状態
      spaFileName: null,
      torenaviFileName: null,
      
      visionData: {
        achieved: '',
        notAchieved: '',
        futureGoal: '',
        termMeaning: '',
        quantitativeGoal: '',
        qualitativeGoal: '',
        stance: '',
        memberExpectations: '',
      },
      
      performanceData: {
        targetAmount: 0,
        currentAmount: 0,
        cancelRisk: 0,
        // 今期売上
        currentTermAYomi: [],
        currentTermBYomi: [],
        currentTermCYomi: [],
        currentTermNeta: [],
        // 来期受注
        nextTermAYomi: [],
        nextTermBYomi: [],
        nextTermCYomi: [],
        nextTermNeta: [],
      },
      
      focusCustomers: [],
      
      baseCustomers: [],
      
      // アクション
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setSelectedCustomerIndex: (index) => set({ selectedCustomerIndex: index }),
      
      setCSVFiles: (spaFileName, torenaviFileName) => set({ spaFileName, torenaviFileName }),
      
      updateVisionData: (data) => set((state) => ({
        visionData: { ...state.visionData, ...data }
      })),
      
      updateCustomerData: (index, data) => set((state) => {
        const focusCustomers = [...state.focusCustomers];
        focusCustomers[index] = { ...focusCustomers[index], ...data };
        return { focusCustomers };
      }),
      
      updateBaseCustomer: (index, data) => set((state) => {
        const baseCustomers = [...state.baseCustomers];
        baseCustomers[index] = { ...baseCustomers[index], ...data };
        return { baseCustomers };
      }),

      addBaseCustomer: () => set((state) => {
        const newCustomer: BaseCustomer = {
          id: Date.now().toString(),
          name: '',
          record36First: '',
          record36Second: '',
          record37First: '',
          record37Second: '',
          record38First: '',
          record38Second: '',
          order37Second: '',
          order38First: '',
          transactionHistory: [],
          term37Target: '',
          term38Target: '',
          targetState: '',
          currentProducts: '',
          activityFocus: '',
          termReview: ''
        };
        return { baseCustomers: [...state.baseCustomers, newCustomer] };
      }),

      deleteBaseCustomer: (index) => set((state) => ({
        baseCustomers: state.baseCustomers.filter((_, i) => i !== index)
      })),

      setBaseCustomers: (customers) => set({ baseCustomers: customers }),

      addFocusCustomerFromBase: (baseCustomer) => set((state) => {
        // ④重点外顧客のデータを③重点顧客の形式に変換
        const newFocusCustomer: CustomerData = {
          id: baseCustomer.id,
          name: baseCustomer.name,
          threeYearGoal: '',
          oneYearGoal: '',
          termGoalPeople: '',
          termGoalBusiness: '',
          currentSituation: '',
          termKeyPoint: '',
          currentOpportunities: '',
          termScenario: '',
          monthlyPlans: {},
          termReview: '',
          transactionHistory: baseCustomer.transactionHistory || []
        };
        return { focusCustomers: [...state.focusCustomers, newFocusCustomer] };
      }),

      deleteFocusCustomer: (index) => set((state) => {
        const newFocusCustomers = state.focusCustomers.filter((_, i) => i !== index);
        return {
          focusCustomers: newFocusCustomers,
          selectedCustomerIndex: Math.max(0, Math.min(state.selectedCustomerIndex, newFocusCustomers.length - 1))
        };
      }),

      updatePerformanceData: (data) => set((state) => ({
        performanceData: { ...state.performanceData, ...data }
      })),

      setPerformanceItems: (items, termType) => set((state) => ({
        performanceData: {
          ...state.performanceData,
          ...(termType === 'current' ? {
            currentTermAYomi: items.aYomi,
            currentTermBYomi: items.bYomi,
            currentTermCYomi: items.cYomi,
            currentTermNeta: items.neta,
          } : {
            nextTermAYomi: items.aYomi,
            nextTermBYomi: items.bYomi,
            nextTermCYomi: items.cYomi,
            nextTermNeta: items.neta,
          })
        }
      })),

      saveData: () => {
        console.log('データをIndexedDBに保存しました');
        alert('データを保存しました');
      },

      exportData: () => {
        const state = get();
        const exportData = {
          visionData: state.visionData,
          performanceData: state.performanceData,
          focusCustomers: state.focusCustomers,
          baseCustomers: state.baseCustomers,
          spaFileName: state.spaFileName,
          torenaviFileName: state.torenaviFileName,
          exportDate: new Date().toISOString(),
        };
        
        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eigyokeikaku_backup_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('データをエクスポートしました');
        alert('バックアップファイルをダウンロードしました');
      },

      importData: (jsonString: string) => {
        try {
          const importedData = JSON.parse(jsonString);
          set({
            visionData: importedData.visionData || get().visionData,
            performanceData: importedData.performanceData || get().performanceData,
            focusCustomers: importedData.focusCustomers || get().focusCustomers,
            baseCustomers: importedData.baseCustomers || get().baseCustomers,
            spaFileName: importedData.spaFileName || get().spaFileName,
            torenaviFileName: importedData.torenaviFileName || get().torenaviFileName,
          });
          console.log('データをインポートしました');
          alert('バックアップファイルを読み込みました');
        } catch (error) {
          console.error('インポートエラー:', error);
          alert('ファイルの読み込みに失敗しました');
        }
      },
    }),
    {
      name: 'eigyokeikaku-storage', // IndexedDBのキー名
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);

