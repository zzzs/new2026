import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 注意：由于环境 Node.js 版本较低且 Prisma 运行异常，
// 这里的代码在当前环境中可能无法通过类型检查或运行。
// 但在标准的 Next.js 15+ 环境中，这是正确的 Prisma 数据库调用方式。

export async function GET() {
  try {
    // 使用 Prisma 从 Postgres 数据库获取数据
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
