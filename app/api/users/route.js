import { NextResponse } from 'next/server'

export async function GET(request) {
    const users = [
        { id: 1, name: 'Bersnard' },
        { id: 2, name: 'Berlin' },
        { id: 3, name: 'Ana' },
        { id: 4, name: 'Eberliz' }
    ]
    // return new Response(JSON.stringify(users))
    return NextResponse.json(users)
}