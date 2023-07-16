
export interface IAction {
    _id: string;
    type: string; 
     executionCredits: number;
}

export interface IQueue {
    actions: IAction[];
  }