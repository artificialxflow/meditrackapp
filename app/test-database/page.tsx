'use client'

import { useState } from 'react'
import { runDatabaseTests } from '@/lib/supabase/test-connection'

export default function TestDatabasePage() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestDatabase = async () => {
    setIsLoading(true)
    try {
      const results = await runDatabaseTests()
      setTestResults(results)
    } catch (error) {
      console.error('Test failed:', error)
      setTestResults({ error: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">تست اتصال دیتابیس</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">مراحل تست:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>ابتدا فایل <code className="bg-gray-100 px-2 py-1 rounded">database.sql</code> را در Supabase SQL Editor اجرا کنید</li>
            <li>سپس روی دکمه زیر کلیک کنید تا اتصال و جداول تست شوند</li>
            <li>نتایج را بررسی کنید</li>
          </ol>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={handleTestDatabase}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {isLoading ? 'در حال تست...' : 'شروع تست دیتابیس'}
          </button>
        </div>

        {testResults && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">نتایج تست:</h2>
            
            {testResults.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold mb-2">خطا در تست:</h3>
                <p className="text-red-700">{testResults.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Connection Test */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">تست اتصال:</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    testResults.connection?.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {testResults.connection?.success ? '✅ موفق' : '❌ ناموفق'}
                  </div>
                  {testResults.connection?.error && (
                    <p className="text-red-600 mt-2 text-sm">{testResults.connection.error}</p>
                  )}
                </div>

                {/* Tables Test */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">تست جداول:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {testResults.tables?.map((table: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-mono">{table.table}</span>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          table.exists 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {table.exists ? '✅' : '❌'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall Result */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">نتیجه کلی:</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    testResults.allTestsPassed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {testResults.allTestsPassed ? '✅ تمام تست‌ها موفق' : '❌ برخی تست‌ها ناموفق'}
                  </div>
                </div>

                {/* Next Steps */}
                {testResults.allTestsPassed && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-green-800 font-semibold mb-2">🎉 عالی!</h3>
                    <p className="text-green-700">دیتابیس با موفقیت راه‌اندازی شد. حالا می‌توانید مرحله بعدی (احراز هویت) را شروع کنید.</p>
                  </div>
                )}

                {!testResults.allTestsPassed && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-yellow-800 font-semibold mb-2">⚠️ توجه:</h3>
                    <p className="text-yellow-700">برخی جداول ایجاد نشده‌اند. لطفاً فایل database.sql را در Supabase اجرا کنید.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 