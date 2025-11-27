  import React, { useEffect, useRef } from "react";
  import { Label } from "../ui/label";
  import { Input } from "../ui/input";
  import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
  import { Button } from "../ui/button";
  import axios from "axios";
  import { Skeleton } from "../ui/skeleton";

  const ProductImageUpload = ({
    file, // image file
    setFile, // setImageFile
    uploadedImageUrl,
    setUploadedImageUrl,
    setimageLoadingState,
    imageLoadingState,
    isEditmode,
  }) => {

    console.log(isEditmode, "This is edit or not");
    
    const inputRef = useRef(null);
    const handleImagefileChange = (event) => {
      console.log(event.target.files);
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };

    const handleDrageOver = (e) => {
      e.preventDefault();
    };
    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) {
        setFile(droppedFile);
      }
    };

    const handleRemoveImage = () => {
      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };
    // console.log(file);
    const uploadImagetoCloudinary = async () => {
      setimageLoadingState(true);
      const data = new FormData();
      data.append("my_file", file);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      console.log("The respone is", response.data);

      if (response.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        setimageLoadingState(false);
      }
    };
    useEffect(() => {
      if (file !== null) {
        uploadImagetoCloudinary();
      }
    }, [file]);

    return (
      <div className="w-full max-w-md mx-auto mt-4">
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
        <div
          onDragOver={handleDrageOver}
          onDrop={handleDrop}
          className= {`${isEditmode ? "opacity-60 " : ""}border-2 border-dashed rounded-lg p-4`}
        >
          <Input
            id="image-upload"
            type="file"
            //   className="hidden"
            ref={inputRef}
            onChange={handleImagefileChange}
            disabled={isEditmode}
          />
          {!file ? (
            <Label
              htmlFor="image-upload"
              className={`${isEditmode ? 'cursor-not-allowed ' : ""}flex flex-col items-center justify-center h-32 cursor-pointer`}
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>Drag & drop or click to upload image</span>
            </Label>
          ) : imageLoadingState ? (
            <Skeleton className="h-10 bg-gray-100" />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{file.name} </p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default ProductImageUpload;
