import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadinBtn from "@/pages/components/specialLoadingBtn";
import { addNewProject, clearAllProjectSliceError, getAllProject, resetProjectSlice } from "@/store/slices/projectSlice";

function AddProject() {
  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleAddNewProject = (e) => {
    e.preventDefault();
    if (!title || !description || tags.length === 0 || !imageFile) {
      toast.error("Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Description", description);
    formData.append("tags", JSON.stringify(tags)); 
    formData.append("image", imageFile);
   formData.append("demoUrl", demoUrl);
    formData.append("gitHubUrl", gitHubUrl);
    dispatch(addNewProject(formData));
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

 

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }

    if(message){
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProject());
      setDemoUrl("");
      setDescription("");
      setTitle("");
      setGitHubUrl("");
      setImageFile("");
      setImagePreview("");
      setTagInput("");
      setTags([]);

    }
  },[dispatch,loading,error,message]);


  return (
    <div className="flex justify-center items-center w-full h-full px-4 py-6">
      <form
        onSubmit={handleAddNewProject}
        className="w-full max-w-2xl space-y-6"
      >
        <h1 className="text-center text-2xl font-bold tracking-tight dark:text-gray-100">
          Add Project
        </h1>

        {/* Title */}
        <div className="w-full space-y-1">
          <label className="text-sm font-medium">Project Title</label>
          <Input
            placeholder="Enter Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="w-full space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div className="w-full space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag"
            />
            <Button type="button" onClick={handleAddTag}  className="gap-1 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white">
              <Plus size={16} /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
             <div key={index} className="group flex flex-col items-start">
                            <X
                              size={18}
                              onClick={() => handleRemoveTag(tag)}
                              className="cursor-pointer self-end transform transition duration-200 group-hover:scale-125 hover:text-red-500"
                            />
                            <Badge
                              variant="outline"
                              className="transform transition duration-200 group-hover:scale-110 flex items-center rounded-full px-3 py-1 text-sm shadow-sm"
                            >
                              {tag}
                            </Badge>
                          </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="w-full space-y-2">
          <label className="text-sm font-medium">Upload Image</label>
           <Input
              type="file"
              value={imageFile}
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-80 object-contain rounded-md shadow"
            />
          )}
        </div>

        {/* Demo URL */}
        <div className="w-full space-y-1">
          <label className="text-sm font-medium">Demo URL</label>
          <Input type="url" placeholder="https://demo.com/project" onChange={(e)=>setDemoUrl(e.target.value)} />
        </div>

        {/* GitHub URL */}
        <div className="w-full space-y-1">
          <label className="text-sm font-medium">GitHub URL</label>
          <Input type="url" placeholder="https://github.com/user/repo" onChange={(e)=>setGitHubUrl(e.target.value)} />
        </div>

        {/* Submit */}
        {loading ? (
          <SpecialLoadinBtn content="Adding New Project..." />
        ) : (
          <Button
            type="submit"
            className="w-full hover:bg-primary/90 transform transition duration-200 hover:scale-105"
          >
            Add New Project
          </Button>
        )}
      </form>
    </div>
  );
}

export default AddProject;
