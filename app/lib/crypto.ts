import { randomBytes, createHash } from 'crypto';

export function generateSecureToken(byteLength: number = 48): string {
  // 48 byte ≈ 64 char base64url; çakışma olasılığı ihmal edilebilir düzeyde
  return randomBytes(byteLength).toString('base64url');
}

export function hashTokenSha256(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}




