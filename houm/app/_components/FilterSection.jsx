import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../@/components/ui/select"
import { Bath, Bed, Car } from 'lucide-react';
  

function FilterSection({setBedroomCount,setBathroomCount,setParkingCount,setHouseType}) {
  return (
    <div className='px-3 py-4 grid grid-col-2 md:flex gap-2'>

      <Select onValueChange={setBedroomCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bedrooms" />
        </SelectTrigger>
        <SelectContent className='bg-white px-[65px]'>
          <SelectItem className='my-2' value="2">
            <h2 className='flex gap-2'><Bed className='h-5 w-5 text-primary'></Bed>2</h2>
          </SelectItem>
          <SelectItem className='my-2' value="3">
            <h2 className='flex gap-2'><Bed className='h-5 w-5 text-primary'></Bed>3</h2>
          </SelectItem>
          <SelectItem className='my-2' value="4">
            <h2 className='flex gap-2'><Bed className='h-5 w-5 text-primary'></Bed>4</h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathroomCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bathrooms" />
        </SelectTrigger>
        <SelectContent className='bg-white px-[65px]'>
          <SelectItem className='my-2' value="2">
            <h2 className='flex gap-2'><Bath className='h-5 w-5 text-primary'></Bath>2</h2>
          </SelectItem>
          <SelectItem className='my-2' value="3">
            <h2 className='flex gap-2'><Bath className='h-5 w-5 text-primary'></Bath>3</h2>
          </SelectItem>
          <SelectItem className='my-2' value="4">
            <h2 className='flex gap-2'><Bath className='h-5 w-5 text-primary'></Bath>4</h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent className='bg-white px-[65px]'>
          <SelectItem className='my-2' value="1">
            <h2 className='flex gap-2'><Car className='h-5 w-5 text-primary'></Car>1</h2>
          </SelectItem>
          <SelectItem className='my-2' value="2">
            <h2 className='flex gap-2'><Car className='h-5 w-5 text-primary'></Car>2</h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value)=>value=='Any'?setHouseType(null): setHouseType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="House Type" />
        </SelectTrigger>
        <SelectContent className='bg-white px-[40px]'>
          <SelectItem className='my-2' value="Any">
            Any
          </SelectItem>
          <SelectItem className='my-2' value="Single Family">
            Single Family
          </SelectItem>
          <SelectItem className='my-2' value="Town House">
            Town House
          </SelectItem>
          <SelectItem className='my-2' value="Condo">
            Condo
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}

export default FilterSection