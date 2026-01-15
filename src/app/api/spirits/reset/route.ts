import { NextResponse } from 'next/server';
import { resetSpirits, getSpirits } from '../data';

// POST /api/spirits/reset - сброс данных к начальному состоянию
export async function POST() {
  resetSpirits();
  const spirits = getSpirits();
  return NextResponse.json({ success: true, spirits });
}
