import { NextResponse } from 'next/server';
import { getSpirits } from './data';

// GET /api/spirits - получение списка духов
export async function GET() {
  const spirits = getSpirits();
  return NextResponse.json(spirits);
}
