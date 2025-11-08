import { compare, hash } from 'bcrypt';

export const hashText = async (text: string) => {
  return await hash(text, 10);
};

export const compareText = async (text: string, encryptedText: string) => {
  return await compare(text, encryptedText);
};
