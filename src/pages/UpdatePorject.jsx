import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import SpecialLoadinBtn from "@/pages/components/specialLoadingBtn";
import {
  clearAllProjectSliceError,

  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tag, setTag] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tag.includes(trimmed)) {
      setTag([...tag, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTag(tag.filter((t) => t !== tagToRemove));
  };

  const handleUpdate =(e)=>{
      e.preventDefault();
       if (!title || !description || tag.length === 0 || !imageFile) {
            toast.error("Please fill all required fields!");
            return;
          }
      
          const formData = new FormData();
          formData.append("title", title);
          formData.append("Description", description);
          formData.append("tags", JSON.stringify(tag)); 
          formData.append("image", imagePreview);
         formData.append("demoUrl", demoUrl);
          formData.append("gitHubUrl", gitHubUrl);
         
     dispatch(updateProject( id, formData ));
  }

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/project/getSingleProject/${id}`,
          { withCredentials: true }
        );
        const p = res.data.project;
        setTitle(p.title);
        setDescription(p.Description);
        setDemoUrl(p.demoUrl ?? "");
        setGitHubUrl(p.gitHubUrl ?? "");
        setImagePreview(p.image.url);
        setImageFile(p.image.url)
        setTag(p.tags || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      }
    };
    getProject();
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex justify-center px-4 py-10">
      <form  onSubmit={handleUpdate} className="w-full max-w-2xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow space-y-6">
        <h1 className="text-2xl font-bold text-center text-primary">Update Project</h1>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Project Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              className="gap-1 border border-primary bg-transparent text-primary hover:bg-primary hover:text-white"
            >
              <Plus size={16} /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tag.map((t) => (
              <div key={t} className="group flex flex-col items-start">
                <X
                  size={18}
                  onClick={() => handleRemoveTag(t)}
                  className="cursor-pointer self-end transition group-hover:scale-125 hover:text-red-500"
                />
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  {t}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Upload Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-64 w-full object-contain rounded-md shadow"
            />
          )}
        </div>

        {/* Demo URL */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Demo URL</label>
          <Input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://demo.com/project"
          />
        </div>

        {/* GitHub URL */}
        <div className="space-y-1">
          <label className="text-sm font-medium">GitHub URL</label>
          <Input
            type="url"
            value={gitHubUrl}
            onChange={(e) => setGitHubUrl(e.target.value)}
            placeholder="https://github.com/user/repo"
          />
        </div>

        {/* Submit */}
        {loading ? (
          <SpecialLoadinBtn content="Updating..." />
        ) : (
          <Button
            type="submit"
            className="w-full hover:bg-primary/90 transition hover:scale-105"
          >
            Save Changes
          </Button>
        )}
      </form>
    </div>
  );
}

export default UpdateProject;
