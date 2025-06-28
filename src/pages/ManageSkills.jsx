
import { clearAllSkillSliceError, getAllSkills, resetSkillSlice } from '@/store/slices/skillSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { Trash2 } from 'lucide-react';

function ManageSkills() {
  const {loading , skills , error , message} = useSelector((state)=>state.skill);
  const dispatch = useDispatch();


  const handleUpdateSkills=(id)=>{

  }

   const handleDeleteSkills=(id)=>{

  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllSkillSliceError());
     
    }

    if(message){
      toast.success(message);
        dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  },[dispatch,error,loading,message]);
  return (
    <>
   <div className="flex flex-col p-2">
        <main className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0  md:gap-8 lg:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2  p-4">
            <div className='flex  justify-between items-center bg-muted/40 '>
            <h1 className="text-center text-2xl  font-bold tracking-tight dark:text-gray-100">
            Manage Your Skills
          </h1>
          <Link to={"/"}>
           <Button>
            Back to Dashboard
           </Button>
          </Link>
            </div>
  
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
                          {skills ? (
                            skills.map((skill, index) => (
                              <TableRow key={index}>
                                <TableCell className="truncate max-w-[140px]">
                                  {skill.category}
                                </TableCell>
  
                                <TableCell className="max-w-[140px]">
                                  <ul className=" list-inside space-y-1">
                                    {skill.skills?.map((skill, idx) => (
                                      <li key={idx} className="truncate">
                                        {skill}
                                      </li>
                                    ))}
                                  </ul>
                                </TableCell>
  
                                <TableCell className="flex gap-2 flex-wrap">
                                  <Link to={`/project/view/${skill._id}`}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="transform transition duration-200 hover:scale-110 hover:bg-primary hover:text-muted"
                                    >
                                      Update
                                    </Button>
                                  </Link>
                                     <Button
                                  variant="destructive"
                                  className="transform transition duration-200 hover:scale-110"
                                  size="sm"
                                  onClick={() => {
                                    // TODO: implement delete handler
                                    console.log("Delete project", skill._id);
                                  }}
                                >
                                <Trash2 size="18"/>
                                </Button>
                                  
                                
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell className="text-3xl overflow-hidden">
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
    
    </>
  )
}

export default ManageSkills