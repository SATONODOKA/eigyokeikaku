import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Tab = 'vision' | 'performance' | 'focus' | 'base';

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

interface PerformanceData {
  // 業績データ
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

interface AppState {
  // UI状態
  activeTab: Tab;
  selectedCustomerIndex: number;
  
  // データ
  visionData: VisionData;
  performanceData: PerformanceData;
  focusCustomers: CustomerData[];
  baseCustomers: any[];
  
  // アクション
  setActiveTab: (tab: Tab) => void;
  setSelectedCustomerIndex: (index: number) => void;
  updateVisionData: (data: Partial<VisionData>) => void;
  updateCustomerData: (index: number, data: Partial<CustomerData>) => void;
  saveData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初期状態
      activeTab: 'vision',
      selectedCustomerIndex: 0,
      
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
      
      performanceData: {},
      
      focusCustomers: [
        { id: '1', name: '顧客A', relationLevel: 'level1', quantitativeGoal: '', qualitativeGoal: '', monthlyPlans: {}, termReview: '', events: [] },
        { id: '2', name: '顧客B', relationLevel: 'level1', quantitativeGoal: '', qualitativeGoal: '', monthlyPlans: {}, termReview: '', events: [] },
        { id: '3', name: '顧客C', relationLevel: 'level1', quantitativeGoal: '', qualitativeGoal: '', monthlyPlans: {}, termReview: '', events: [] },
        { id: '4', name: '顧客D', relationLevel: 'level1', quantitativeGoal: '', qualitativeGoal: '', monthlyPlans: {}, termReview: '', events: [] },
        { id: '5', name: '顧客E', relationLevel: 'level1', quantitativeGoal: '', qualitativeGoal: '', monthlyPlans: {}, termReview: '', events: [] },
      ],
      
      baseCustomers: [],
      
      // アクション
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setSelectedCustomerIndex: (index) => set({ selectedCustomerIndex: index }),
      
      updateVisionData: (data) => set((state) => ({
        visionData: { ...state.visionData, ...data }
      })),
      
      updateCustomerData: (index, data) => set((state) => {
        const focusCustomers = [...state.focusCustomers];
        focusCustomers[index] = { ...focusCustomers[index], ...data };
        return { focusCustomers };
      }),
      
      saveData: () => {
        // データは自動的に永続化されるので、ここでは保存成功のメッセージを表示するだけ
        console.log('データを保存しました');
        alert('データを保存しました');
      },
    }),
    {
      name: 'eigyokeikaku-storage', // ローカルストレージのキー
    }
  )
);

