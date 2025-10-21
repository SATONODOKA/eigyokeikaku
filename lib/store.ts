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
          name: '武蔵システムズ株式会社',
          employeeCount: '2,000',
          record36First: '5,000',
          record36Second: '11,000',
          record37First: '9,800',
          record37Second: '17,600',
          record38First: '3,000',
          record38Second: '2,000',
          term37Target: '19,000',
          term38Target: '25,000',
          targetState: '',
          currentProducts: '',
          activityFocus: '',
          termReview: ''
        },
        {
          id: '2',
          name: '顧客B株式会社',
          employeeCount: '500',
          record36First: '0',
          record36Second: '0',
          record37First: '0',
          record37Second: '0',
          record38First: '0',
          record38Second: '0',
          term37Target: '',
          term38Target: '',
          targetState: '',
          currentProducts: '',
          activityFocus: '',
          termReview: ''
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

      saveData: () => {
        console.log('データを保存しました（メモリ上）');
        alert('データを保存しました（メモリ上に一時保存）');
      },
    }));

