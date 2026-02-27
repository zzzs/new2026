import Image from "next/image";

interface Product {
  id: number;
  name: string | null;
  image: string;
  createdAt: Date;
}

async function getProducts(): Promise<Product[]> {
  // 注意：在服务器端渲染（SSR）中，如果是请求本地 API，最好直接调用数据逻辑，
  // 或者使用绝对路径。由于这是演示，我们假设它是从外部或通过 fetch 获取。
  // 为了确保 SSR 正常，这里我们直接从 API 获取，但在本地开发时可能需要绝对路径。
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store", // 确保是 SSR
  });
  console.log('--> res', res)
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductListPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-blue-600">TechStore</div>
            <div className="hidden sm:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600">首页</a>
              <a href="#" className="text-blue-600 font-medium">产品</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">关于</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 头部展示 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            热门产品列表
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500">
            探索我们的最新科技产品，为您提供极致的性能与体验。
          </p>
        </div>
      </header>

      {/* 产品列表网格 */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
              <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 transition-opacity">
                <img
                  src={product.image || ""}
                  alt={product.name || "Product"}
                  className="h-64 w-full object-cover object-center"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      新产品
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name || "未命名产品"}
                      </a>
                    </h3>
                  </div>
                  <p className="text-lg font-bold text-blue-600">已上市</p>
                </div>
                <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                  创建时间: {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    立即购买
                  </button>
                  <button className="ml-4 p-2 text-gray-400 hover:text-blue-600 border border-gray-200 rounded-lg">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            © 2026 TechStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
