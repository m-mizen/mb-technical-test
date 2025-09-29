import { ProductsCarousel } from "@/components/ProductsCarousel";
import { getProductData } from "@/service/getProductData";

async function loadProducts() {
  const categories = await getProductData();
  return categories ? categories : [];
}

// This enables ISR (Incremental Static Regeneration), meaning that the page will only request data from the backend every 5 minutes
// This is a good balance between performance and data freshness. The exact value would depend on the specific use case and requirements.
//
// In a real world application, I would rather use a longer timeout paired with on-demand revalidation
// See: https://nextjs.org/docs/app/guides/incremental-static-regeneration#on-demand-revalidation-with-revalidatetag
// NOTE: disabled because this is not compatible with `output: "standalone"`. This is one of the reasons I don't really like NextJS and would prefer to use a library that is more agnostic
// export const revalidate = 60 * 5; 

// This disables build time rendering, which is required to make the build work in the current Docker Compose setup
export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await loadProducts();
  return (
    <div className="py-10 px-5 space-y-10">
      <ProductsCarousel categories={products} />
    </div>
  );
}
