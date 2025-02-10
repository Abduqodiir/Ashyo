import Products from "@/components/Products";
import Brend from "@/module/Brend";
import CategoryMenu from "@/module/CategoryMenu";
import EnjoyMusic from "@/module/EnjoyMusic";
import Hero from "@/module/Hero";

export default function Home() {
  return (
  <>
    <Hero/>
    <Brend/>
    <Products extraClass="hidden sm:block" title="Most popular product" API='/product-items'/>
    <Products extraClass="hidden sm:block" title="Most popular product" API='/product-items'/>
    <Products title="Most popular product" API='/product-items'/>
    <CategoryMenu/>
    <Products title="On-sale Products" API='/product-items'/>
    <EnjoyMusic/>
    <Products title="Last seen Products" API="/product-items"/>
  </>
  );
}
