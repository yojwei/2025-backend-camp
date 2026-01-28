/**
 * CreditPackages Seeder
 * 用於初始化堂數方案資料
 */
require('dotenv').config()
const { dataSource } = require('../db/data-source')

const creditPackages = [
    {
        name: '體驗方案',
        credit_amount: 7,
        price: 1400
    },
    {
        name: '基礎方案',
        credit_amount: 14,
        price: 2520
    },
    {
        name: '進階方案',
        credit_amount: 21,
        price: 4800
    }
]

async function seedCreditPackages() {
    try {
        // 初始化資料庫連接
        await dataSource.initialize()
        console.log('資料庫連接成功')

        const creditPackageRepository = dataSource.getRepository('CreditPackage')

        // 檢查是否已有資料，如果有則跳過 seeding
        const existingCount = await creditPackageRepository.count()
        if (existingCount > 0) {
            console.log(`已存在 ${existingCount} 筆 CreditPackage 資料，跳過 seeding`)
            return
        }

        // 清空現有的 CreditPurchase / CreditPackage 資料（含外鍵約束）
        console.log('正在清空現有的 CreditPurchase / CreditPackage 資料...')
        await dataSource.query(
            'TRUNCATE TABLE "CREDIT_PURCHASE", "CREDIT_PACKAGE" RESTART IDENTITY CASCADE'
        )

        // 插入新資料
        console.log('正在插入 CreditPackage 資料...')
        for (const pkg of creditPackages) {
            const creditPackage = creditPackageRepository.create(pkg)
            await creditPackageRepository.save(creditPackage)
            console.log(`✓ 已新增方案: ${pkg.name}`)
        }

        console.log('\n✓ CreditPackages seeder 執行完成！')
        console.log(`總共新增了 ${creditPackages.length} 筆資料`)
    } catch (error) {
        console.error('Seeder 執行失敗:', error)
        process.exit(1)
    } finally {
        // 關閉資料庫連接
        if (dataSource.isInitialized) {
            await dataSource.destroy()
            console.log('資料庫連接已關閉')
        }
    }
}

// 執行 seeder
seedCreditPackages()
