import { Bath, BedDouble, CarFront, Drill, Home, LandPlot, MapPin, Share } from 'lucide-react'
import React from 'react'
import { Button } from '../../../../@/components/ui/button'
import GoogleMapSection from '../../../_components/GoogleMapSection'
import AgentDetail from './AgentDetail'


function Details({listingDetail}) {
    console.log(listingDetail?.coordinates)
  return (
    <div className='my-6 flex gap-2 flex-col'>
        <div className='flex justify-between items-center'>
            <div>
                <h2 className='text-3xl p-2'>₹ {listingDetail?.price}</h2>
                <h2 className='text-gray-500 text-lg flex gap-2 p-2'>
                    <MapPin></MapPin>
                    {listingDetail?.address}
                </h2>
            </div>
            {/* <Button className='flex gap-2'><Share></Share> Share</Button> */}
        </div>
        <hr></hr>
        <div className='mt-4 flex flex-col gap-3'>
            <h2 className='font-bold text-xl mt-10 mb-5'>KeyFeatures</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <h2 className='flex gap-2 items-center bg-white 
                rounded-lg p-3 text-primary border-primary border-2 justify-center'>
                    <Home></Home>{listingDetail?.propertyType}
                </h2>
                <h2 className='flex gap-2 items-center bg-white 
                rounded-lg p-3 text-primary border-primary border-2 justify-center'>
                    <Drill></Drill>Built In {listingDetail?.builtIn}
                </h2>
                <h2 className='flex gap-2 items-center bg-white 
                rounded-lg p-3 text-primary border-primary border-2 justify-center'>
                    <LandPlot></LandPlot>{listingDetail?.area} sqft.
                </h2>
                <h2 className='flex gap-2 items-center bg-white 
                rounded-lg p-3 text-primary border-primary border-2 justify-center'>
                    <BedDouble></BedDouble>{listingDetail?.bedroom} Bedroom
                </h2>
                <h2 className='flex gap-2 items-center bg-white 
                rounded-lg p-3 text-primary border-primary border-2 justify-center'>
                    <Bath></Bath>{listingDetail?.bathroom} Bathroom
                </h2>
                <h2 className='flex gap-2 items-center bg-white 
                rounded-lg p-3 text-primary border-primary border-2 justify-center'>
                    <CarFront></CarFront>{listingDetail?.parking} Parking
                </h2>
            </div>
        </div>
        <div className='mt-4'>
            <h2 className='font-bold text-xl mt-10 mb-5'>Description</h2>
            <p className='text-gray-500'>{listingDetail?.description}</p>
        </div>
        <div>
        <h2 className='font-bold text-xl mt-10 mb-5'>Find On Map</h2>
        <GoogleMapSection
        coordinates={listingDetail?.coordinates}
        listing={[listingDetail]}></GoogleMapSection>
        </div>
        <div>
            <h2 className='font-bold text-xl mt-10 mb-5'>Contact Owner</h2>
            <AgentDetail listingDetail={listingDetail}></AgentDetail>
        </div>
    </div>
  )
}

export default Details