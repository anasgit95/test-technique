export const  generateExecutionCredits = (maxCredits: number): number => {
    const minCredits = maxCredits * 0.8;
    const executionCredits = Math.floor(Math.random() * (maxCredits - minCredits + 1) + minCredits);
    return executionCredits;
  }
  