export const addressRegex = /^lsk[a-z0-9!@$&_.]{0,40}$/;
export const delegateNameRegex = /^[a-z0-9!@$&_.]{0,20}$/;
export const transactionIdRegex = /^[1-9]\d{0,19}$/;
export const blockIdRegex = /^[1-9]\d{0,19}$/;

export const isAddress = (address: string) => {
  return addressRegex.test(address);
};
export const isDelegateName = (name: string) => {
  return delegateNameRegex.test(name);
};
