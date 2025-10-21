import { create } from 'zustand';

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
  salesCount: string;
  yearTotal: string;
  term37: string;
  term38: string;
  currentStatus: string;
  measures: string;
  focus: string;
  monthlyPlans: {
    [month: string]: {
      plan: string;
      reflection: string;
    };
  };
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
  saveData: () => void;
}

export const useStore = create<AppState>()((set, get) => ({
      // 初期状態
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
          events: [
            { date: '2024-09-15', type: '提案', content: '新人研修プログラム提案実施', source: 'SPA' },
            { date: '2024-08-20', type: '面談', content: '人事部長との定例面談', source: 'EVENT' },
            { date: '2024-07-10', type: '報告会', content: '前期実績報告会開催', source: 'HISTORY' },
          ]
        },
        { 
          id: '2', 
          name: '顧客B', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: [
            { date: '2024-09-01', type: '研修', content: '管理職研修実施（30名参加）', source: 'SPA' },
            { date: '2024-06-15', type: '提案', content: 'リーダーシップ研修プログラム提案', source: 'EVENT' },
          ]
        },
        { 
          id: '3', 
          name: '顧客C', 
          relationLevel: 'level1', 
          quantitativeGoal: '', 
          qualitativeGoal: '', 
          monthlyPlans: {}, 
          termReview: '', 
          events: [
            { date: '2024-08-05', type: '面談', content: '経営層との戦略ミーティング', source: 'EVENT' },
          ]
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
      
      baseCustomers: [
        {
          id: '1',
          name: '株）グローバルシステムズ',
          salesCount: '2,000',
          yearTotal: '5,000',
          term37: '11,000',
          term38: '19,000',
          currentStatus: '人事部長からHRシステム刷新の検討を進めたいという意向あり（感触良好）',
          measures: '・定例報告会・研修実施\n・情報収集（新人入社予定人数・管理職研修ニーズ）',
          focus: '・情報収集を通じて全社ニーズを把握\n・カウンターパートとの信頼関係構築',
          monthlyPlans: {}
        }
      ],
      
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
      
      saveData: () => {
        console.log('データを保存しました（メモリ上）');
        alert('データを保存しました（メモリ上に一時保存）');
      },
    }));

