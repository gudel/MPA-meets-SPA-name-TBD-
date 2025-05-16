import Image from "next/image"; 

export default function UnderConstruction() {
  return (
    <>
    <Image
      src="/Under-construction.png"
      alt="Under Construction"
      fill
      className="md:block hidden z-1 object-cover opacity-50"
      priority
    />
    <Image
    src="/Under-construction-mobile.png"
    alt="Under Construction"
    fill
    className="md:hidden block z-1 object-cover opacity-50"
    priority
  />
  </>
  );
}