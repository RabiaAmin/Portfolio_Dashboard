import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllSkillSliceError,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,

  updateSkill, // Assuming this works for both add and update based on _id
} from "@/store/slices/skillSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SpecialLoadinBtn from "@/pages/components/specialLoadingBtn";

function ManageSkills() {
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const [isUpdate, setIsUpdate] = useState(false);
  const [skillId, setSkillId] = useState("");
  const [draftSkill, setDraftSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDeleteSkills = (id) => {
    setSkillId(id);
    dispatch(deleteSkill(id));
  };

  const addSkill = () => {
    const trimmed = draftSkill.trim();
    if (!trimmed || selectedSkills.includes(trimmed)) return;
    setSelectedSkills((prev) => [...prev, trimmed]);
    setDraftSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleSaveSkill = (e) => {
    e.preventDefault();
    const payload = {
      category: selectedCategory,
      skills: selectedSkills,
    };
   
    dispatch(updateSkill(skillId,payload));
    setIsUpdate(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
      setDraftSkill("");
      setSelectedSkills([]);
      setSelectedCategory("");
    }
  }, [dispatch, error, loading, message]);

 
  return (
    <div className="flex flex-col p-2">
      <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-4">
          <div className="flex justify-between items-center bg-muted/40">
            <h1 className="text-center text-2xl font-bold tracking-tight dark:text-gray-100">
              Manage Your Skills
            </h1>
            <Link to={"/"}>
              <Button disabled={isUpdate}>Back to Dashboard</Button>
            </Link>
          </div>

          {isUpdate && (
            <form onSubmit={handleSaveSkill}>
              <div className="max-w-2xl mx-auto flex flex-col justify-center items-center gap-6">
                

                <div className="flex gap-3 items-center justify-center">
                   <Input
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                placeholder="Categoru"
                                className="w-full sm:w-72"
                              />
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

                <div className="flex flex-wrap justify-center gap-2">
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="group flex flex-col items-start"
                    >
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

                {loading ? (
                  <SpecialLoadinBtn content="Saving Skill..." />
                ) : (
                  <Button
                    type="submit"
                    
                    className="cursor-pointer w-full hover:bg-primary/90 transform transition duration-200 hover:scale-110"
                  >
                    {isUpdate ? "Update Skill" : "Add Skill"}
                  </Button>
                )}
              </div>
            </form>
          )}

          <Tabs defaultValue="Skills">
            <TabsContent value="Skills">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px]">Category</TableHead>
                          <TableHead className="w-[200px]">Skills</TableHead>
                          <TableHead className="w-[200px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {skills && skills.length > 0 ? (
                          skills.map((skill, index) => (
                            <TableRow key={index}>
                              <TableCell className="truncate max-w-[140px]">
                                {skill.category}
                              </TableCell>
                              <TableCell className="max-w-[140px]">
                                <ul className="list-inside space-y-1">
                                  {skill.skills?.map((s, idx) => (
                                    <li key={idx} className="truncate">
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </TableCell>
                              <TableCell className="flex gap-2 flex-wrap">
                                <Button
                                  variant="outline"
                                  disabled={isUpdate}
                                  size="sm"
                                  onClick={() => {
                                    setIsUpdate(true);
                                    setSkillId(skill._id);
                                    setSelectedCategory(skill.category);
                                    setSelectedSkills(skill.skills);

                                 
                                  }}
                                  className="transform transition duration-200 hover:scale-110 hover:bg-primary hover:text-muted"
                                >
                                  Update
                                </Button>
                                {loading && skillId === skill._id ? (
                                  <SpecialLoadinBtn />
                                ) : (
                                  <Button
                                    variant="destructive"
                                    disabled={isUpdate}
                                    className="transform transition duration-200 hover:scale-110"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteSkills(skill._id)
                                    }
                                  >
                                    <Trash2 size="18" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan="3" className="text-center">
                              You have not added any Skill yet!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default ManageSkills;
