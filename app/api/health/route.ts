import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if Supabase connection is available
    let supabaseStatus = 'unknown'
    try {
      const { supabase } = await import('@/lib/supabase/client')
      const { data, error } = await supabase.from('profiles').select('count').limit(1)
      supabaseStatus = error ? 'error' : 'connected'
    } catch (error) {
      supabaseStatus = 'error'
    }

    // Basic health check
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      },
      database: {
        status: supabaseStatus
      },
      checks: {
        timestamp: new Date().toISOString(),
        uptime: process.uptime() > 0,
        memory: process.memoryUsage().heapUsed < 500 * 1024 * 1024, // Less than 500MB
        environment: !!process.env.NODE_ENV
      }
    }

    return NextResponse.json(healthData, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
} 