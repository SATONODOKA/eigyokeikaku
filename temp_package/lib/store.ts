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
  aYomiItems: PerformanceItem[];
  bYomiItems: PerformanceItem[];
  cYomiItems: PerformanceItem[];
  netaYomiItems: PerformanceItem[];
}

interface CustomerData {
  id: string;
  name: string;
  relationLevel: string;
  quantitativeGoal: string;
  qualitativeGoal: string;
  monthlyPlans: {
    [month: string]: {
      goal: string;
      reflection: string;
    };
  };
  termReview: string;
  events: Array<{
    date: string;
    type: string;
    content: string;
    source: string;
  }>;
}

interface BaseCustomer {
  id: string;
  name: string;
  employeeCount: string;  // 総従業員数
  // CSV読み込み項目（実績 - 半期ごとの売上実績）
  record36First: string;   // 36上
  record36Second: string;  // 36下
  record37First: string;   // 37上
  record37Second: string;  // 37下
  record38First: string;   // 38上
  record38Second: string;  // 38下
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
  updatePerformanceData: (data: Partial<PerformanceData>) => void;
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
        aYomiItems: [],
        bYomiItems: [],
        cYomiItems: [],
        netaYomiItems: [],
      },
      
      focusCustomers: [
        { 
          id: '1', 
          name: '顧客A', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: []
        },
        { 
          id: '2', 
          name: '顧客B', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: []
        },
        { 
          id: '3', 
          name: '顧客C', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: []
        },
        { 
          id: '4', 
          name: '顧客D', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: []
        },
        { 
          id: '5', 
          name: '顧客E', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: []
        },
      ],
      
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
          employeeCount: '',
          record36First: '',
          record36Second: '',
          record37First: '',
          record37Second: '',
          record38First: '',
          record38Second: '',
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

      updatePerformanceData: (data) => set((state) => ({
        performanceData: { ...state.performanceData, ...data }
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

