import { NextRequest } from 'next/server';

export interface Params {
  id: string;
}

export function DELETE(
  req: NextRequest,
  context: { params: Params }
): Promise<Response>;
