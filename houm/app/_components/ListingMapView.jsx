"use client"
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import GoogleMapSection from './GoogleMapSection'
import { supabase } from "../../utils/supabase/client";
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient'

function ListingMapView() {
    const [listing,setListing]=useState([]);
    const [searchedAddress,setSearchedAddress]=useState();
    const [bedroomCount,setBedroomCount]=useState(0);
    const [bathroomCount,setBathroomCount]=useState(0);
    const [parkingCount,setParkingCount]=useState(0);
    const [homeType,setHouseType]=useState();
    const [coordinates,setCoordinates]=useState();

    useEffect(()=>{
        getLatestListing();
    },[])

    const getLatestListing=async()=>{
        const {data,error}=await supabase
        .from('listing')
        .select(`*,listingImages(
            url,
            listing_id
        )`)
        .order('id',{ascending:false})

        if(data){
            console.log(data)
            setListing(data)
        }
        if(error){
            // toast('Server side error')
        }
    }

    const handleSearchClick=async ()=>{
        console.log(searchedAddress)
        const searchTerm=searchedAddress?.value?.structured_formatting?.main_text;
        console.log(searchTerm)
        let query = supabase
        .from('listing')
        .select(`*,listingImages(
            url,
            listing_id
        )`)
        .gte('bedroom',bedroomCount)
        .gte('bathroom',bathroomCount)
        .gte('parking',parkingCount)
        .like('address',`%${searchTerm}%`)
        .order('id',{ascending:false})

        if(homeType){
            query=query.eq('propertyType',homeType)
        }

        const {data,error}=await query;

        if(data){
            console.log(data)
            setListing(data)
        }
        if(error){
            // toast('Server side error')
        }
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
            <Listing listing={listing}
            handleSearchClick={handleSearchClick}
            searchedAddress={(v)=>setSearchedAddress(v)}
            setBedroomCount={setBedroomCount}
            setBathroomCount={setBathroomCount}
            setParkingCount={setParkingCount}
            setHouseType={setHouseType}
            setCoordinates={setCoordinates}></Listing>
        </div>
        <div className='fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]'>
            <GoogleMapSection
            listing={listing}
            coordinates={coordinates}></GoogleMapSection>
        </div>
    </div>
  )
}

export default ListingMapView