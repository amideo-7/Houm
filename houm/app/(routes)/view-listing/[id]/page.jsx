"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from "../../../../utils/supabase/client";
import Slider from '../_components/Slider';
import Details from '../_components/Details';

function ViewListing({params}) {

    const [listingDetail,setListingDetail]=useState();
    useEffect(()=>{
        GetListingDetail();
    },[])
    const GetListingDetail=async()=>{
        const {data,error}=await supabase
        .from('listing')
        .select('*,listingImages(url,listing_id)')
        .eq('id',params.id);

        if(data){
            setListingDetail(data[0]);
            console.log(data)
        }
    }
  return (
    <div className='px-4 md:px-32 lg:px-56 my-3'>
        <Slider imageList={listingDetail?.listingImages}></Slider>
        <Details listingDetail={listingDetail}></Details>
    </div>
  )
}

export default ViewListing