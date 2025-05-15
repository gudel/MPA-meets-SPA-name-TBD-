import Image from "next/image"; 

export default function UnderConstruction() {
  return (
    <Image
      src="/Under-construction.png"
      alt="Under Construction"
      fill
      className="z-1 object-cover opacity-50"
      priority
    />
  );
}