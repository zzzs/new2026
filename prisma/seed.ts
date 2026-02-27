import { prisma } from "../lib/prisma";

async function main() {
  console.log("正在填充种子数据...");

  const products = [
    {
      name: "iPhone 16 Pro",
      price: 1099,
      category: "phone",
      description: "Apple's latest flagship phone with ProMotion display and A16 Bionic chip.",
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80",
    },
    {
      name: "MacBook Pro M3",
      price: 1999,
      category: "laptop",
      description: "Apple's latest MacBook Pro with M3 chip and 14-inch Retina display.",
      image: "https://images.unsplash.com/photo-1517336714460-4c9889a10a86?w=800&q=80",
    },
    {
      name: "iPad Pro",
      price: 1099,
      category: "tablet",
      description: "Apple's latest iPad Pro with M3 chip and 14-inch Retina display.",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    },
    {
      name: "Apple Watch Ultra",
      price: 399,
      category: "watch",
      description: "Apple's latest Apple Watch Ultra with ProMotion display and A16 Bionic chip.",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    },
    {
      name: "AirPods Max",
      price: 249,
      category: "headphones",
      description: "Apple's latest AirPods Max with Active Noise Cancellation and Spatial Audio.",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("种子数据填充完成！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // pg 驱动需要手动关闭 pool，或者等进程结束
  });
