import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addNewSkill, clearAllSkillSliceError, getAllSkills, resetSkillSlice } from "@/store/slices/skillSlice";
import { toast } from "react-toastify";
import SpecialLoadinBtn from '@/pages/components/specialLoadingBtn'

function AddSkills() {
  const [draftSkill, setDraftSkill] = useState(""); // Input value
  const [skills, setSkills] = useState([]); // List of skills
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { loading, error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("categories");
      if (stored) setCategories(JSON.parse(stored));
    } catch {
      /* ignore corrupted data */
    }
  }, []);

  // 2.  save on every change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllSkillSliceError());
    }

    if(message){
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
      setSkills([]);
      setSelectedCategory("");
    }
  },[dispatch,loading,error,message])

 
  const addSkill = () => {
    const trimmed = draftSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((prev) => [...prev, trimmed]);
    setDraftSkill(""); // Clear input
  };

  const addCategories = () => {
    const trimmed = category.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories((prev) => [...prev, trimmed]);
    setSelectedCategory(trimmed);
    setCategory("");
  };

  // Remove skill handler
  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

const handleSaveSkill = (e) => {
  e.preventDefault();
  const payload = { category: selectedCategory, skills };   // <- plain object
  dispatch(addNewSkill(payload));
};

  return (
    <div className="flex justify-center items-center  w-full h-full px-4 py-6">
      <form onSubmit={handleSaveSkill}>
        <div className="max-w-2xl mx-auto flex flex-col justify-center items-center gap-6">
          {/* Heading */}
          <h1 className="text-center text-2xl font-bold tracking-tight dark:text-gray-100">
            Add Skill
          </h1>

          {/* Category selection */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Select
              value={selectedCategory} /* ← move value here */
              onValueChange={setSelectedCategory} /* you already have this */
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />{" "}
                {/* remove value prop */}
              </SelectTrigger>

              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c} className="capitalize">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                placeholder="New category"
                value={category}
                className="flex-1 sm:w-52"
                onChange={(e) => setCategory(e.target.value)}
              />
              <Button
                type="button"
                className="gap-1 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
                onClick={addCategories}
              >
                <Plus size={16} /> Add
              </Button>
            </div>
          </div>

          {/* New skill input */}
          <div className="flex gap-3 items-center justify-center">
            <Input
              value={draftSkill}
              onChange={(e) => setDraftSkill(e.target.value)}
              placeholder="New skill"
              className="w-full sm:w-72"
            />
            <Button
              type="button"
              onClick={addSkill}
              className="gap-1 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Plus size={16} /> Add
            </Button>
          </div>

          {/* Skills list */}
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <div key={skill} className="group flex flex-col items-start">
                <X
                  size={18}
                  onClick={() => removeSkill(skill)}
                  className="cursor-pointer self-end transform transition duration-200 group-hover:scale-125 hover:text-red-500"
                />
                <Badge
                  variant="outline"
                  className="transform transition duration-200 group-hover:scale-110 flex items-center rounded-full px-3 py-1 text-sm shadow-sm"
                >
                  {skill}
                </Badge>
              </div>
            ))}
          </div>

          {/* Save Button */}
           {
                    loading ? <SpecialLoadinBtn content="Adding New Skill...." /> :
                  <Button type="submit" className="cursor-pointer w-full hover:bg-primary/90 transform transition duration-200 hover:scale-110">
                    Add New Skill
                  </Button>
                  }
        </div>
      </form>
    </div>
  );
}

export default AddSkills;
