export const generateOTP = () => {
  return `${Math.floor(Math.random() * 90000 + 10000)}`;
};

export const expiryDate = (time: number = 5 * 60 * 1000) => {
  return new Date(Date.now() + time);
};
