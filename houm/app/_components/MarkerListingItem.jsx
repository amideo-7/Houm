import React from "react";
import { Bath, BedDouble, MapPin, Ruler, Search, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";

function MarkerListingItem({ item, closeHandler }) {
  return (
    <div>
      <div className="cursor-pointer rounded-lg w-[180px]">
        <X onClick={()=>closeHandler()}></X>
        <Image
          src={item.listingImages[0].url}
          width={800}
          height={150}
          className="rounded-lg object-cover h-[120px] w-[180px]"
        ></Image>
        <div className="bg-white rounded-lg flex mt-2 flex-col gap-2 p-2">
          <h2 className="font-bold text-lg">₹{item?.price}</h2>
          <h2 className="flex gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4"></MapPin>
            {item.address}
          </h2>
          <div className="flex gap-2 mt-2 justify-between">
            <h2 className="flex w-full gap-2 text-sm items-center bg-slate-200 rounded-md p-2 text-gray-500 justify-center">
              <BedDouble className="h-4 w-4"></BedDouble>
              {item?.bedroom}
            </h2>
            <h2 className="flex w-full gap-2 text-sm items-center bg-slate-200 rounded-md p-2 text-gray-500 justify-center">
              <Bath className="h-4 w-4"></Bath>
              {item?.bathroom}
            </h2>
            
          </div>
          <Link href={'/view-listing/'+item.id} className="w-full">
          <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MarkerListingItem;
