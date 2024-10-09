export interface HashService {
  generate(value: string): Promise<string>;
  compare(value: string, hashedValue: string): Promise<boolean>;
}
