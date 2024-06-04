"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../@/components/ui/select";
import { Input } from "../../../../@/components/ui/input";
import { Textarea } from "../../../../@/components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { Formik } from "formik";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../@/components/ui/alert-dialog";

function EditListing({ params }) {
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(params.split('/')[2]);
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);
    if (data) {
      console.log(data);
    }

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (data) {
      console.log(data);
      toast("Listing updated and published");
      setLoading(false);
    }
    for (const image of images) {
      setLoading(true);
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split(".").pop();
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });
      if (error) {
        setLoading(false);
        // toast("Error uploading images");
      } else {
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: params?.id }])
          .select();

        if (data) {
          setLoading(false);
        }

        if (error) {
          setLoading(false);
        }
      }
      setLoading(false);
    }
  };

  const publishBtnHandler = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", params?.id)
      .select();
    if (data) {
      setLoading(false);
      toast("Listing Published");
    }
  };

  return (
    <div className="px-10 md:px-36 my-10">
      <h2 className="text-2xl">Enter property details</h2>

      <Formik
        initialValues={{
          propertyType: "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Property Type</h2>
                  <Select
                    onValueChange={(e) => (values.propertyType = e)}
                    name="propertyType"
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Bedroom</h2>
                  <Input
                    placeholder="Ex.2"
                    name="bedroom"
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Bathroom</h2>
                  <Input
                    placeholder="Ex.2"
                    name="bathroom"
                    onChange={handleChange}
                  ></Input>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Built In</h2>
                  <Input
                    placeholder="Ex.2003"
                    name="builtIn"
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Parking</h2>
                  <Input
                    placeholder="Ex.2"
                    name="parking"
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Lot Size (Sq.Ft)</h2>
                  <Input
                    placeholder=""
                    name="lotSize"
                    onChange={handleChange}
                  ></Input>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Built Area (Sq.Ft)</h2>
                  <Input
                    placeholder=""
                    name="area"
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Selling Price</h2>
                  <Input
                    placeholder="400000"
                    name="price"
                    onChange={handleChange}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">HOA (Per Month)</h2>
                  <Input
                    placeholder="100"
                    name="hoa"
                    onChange={handleChange}
                  ></Input>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 p-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Description</h2>
                  <Textarea
                    placeholder=""
                    name="description"
                    onChange={handleChange}
                  ></Textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 p-8">
                <h2 className="text-lg text-slate-500">
                  Upload Property Images
                </h2>
                <FileUpload
                  setImages={(value) => setImages(value)}
                  imageList={listing.listingImages}
                ></FileUpload>
              </div>

              <div className="flex gap-7 justify-end p-8">
                {/* <Button
                  variant="outline"
                  className="text-primary border-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="animate-spin"></Loader>
                  ) : (
                    "Save"
                  )}
                </Button> */}

                <Button type="submit" disabled={loading} className="">
                  {loading ? (
                    <Loader className="animate-spin"></Loader>
                  ) : (
                    "Save & Publish"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
