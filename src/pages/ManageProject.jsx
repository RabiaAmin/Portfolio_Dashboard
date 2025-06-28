import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SpecialLoadinBtn from "@/pages/components/specialLoadingBtn";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  clearAllProjectSliceError,
  deleteProject,
  getAllProject,
  resetProjectSlice,
} from "@/store/slices/projectSlice";

function ManageProject() {
  


  const { loading, project, error, message } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();
  const handleDeleteProject = (id) => {
   
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProject());
    }
  }, [dispatch, error, loading, message]);
  return (
    <div className="flex flex-col p-2">
      <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-4">
          <div className="flex justify-between items-center bg-muted/40">
            <h1 className="text-center text-2xl font-bold tracking-tight dark:text-gray-100">
              Manage Your Project
            </h1>
            <Link to={"/"}>
              <Button>Back to Dashboard</Button>
            </Link>
          </div>

          <Tabs defaultValue="projects">
            <TabsContent value="projects">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px]">Title</TableHead>
                          <TableHead className="w-[200px]">
                            Description
                          </TableHead>
                          <TableHead className="w-[150px]">Tags</TableHead>
                          <TableHead className="w-[100px]">Image</TableHead>
                          <TableHead className="w-[100px]">Demo</TableHead>
                          <TableHead className="w-[100px]">GitHub</TableHead>
                          <TableHead className="w-[200px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {project ? (
                          project.map((proj, index) => (
                            <TableRow key={index}>
                              <TableCell className="truncate max-w-[140px]">
                                {proj.title}
                              </TableCell>
                              <TableCell className="truncate max-w-[180px]">
                                {proj.Description}
                              </TableCell>
                              <TableCell className="max-w-[140px]">
                                <ul className=" list-inside space-y-1">
                                  {proj.tags?.map((tag, idx) => (
                                    <li key={idx} className="truncate">
                                      {tag}
                                    </li>
                                  ))}
                                </ul>
                              </TableCell>
                              <TableCell>
                                <img
                                  src={proj.image.url}
                                  alt="project"
                                  className="w-12 h-12 object-cover rounded"
                                />
                              </TableCell>
                              <TableCell>
                                <a
                                  href={proj.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  Demo URL
                                </a>
                              </TableCell>
                              <TableCell>
                                <a
                                  href={proj.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  GitHub URL
                                </a>
                              </TableCell>
                              <TableCell className="flex gap-2 flex-wrap">
                                 <Link to={`/view/projects/${proj._id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                 
                                  }}
                                  className="transform transition duration-200 hover:scale-110 hover:bg-primary hover:text-muted"
                                >
                                  View
                                </Button>
                                </Link>
                                <Link to={`/update/projects/${proj._id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                 
                                  }}
                                  className="transform transition duration-200 hover:scale-110 hover:bg-primary hover:text-muted"
                                >
                                  Update
                                </Button>
                                </Link>
                                {loading && project === proj._id ? (
                                  <SpecialLoadinBtn />
                                ) : (
                                  <Button
                                    variant="destructive"
                                    className="transform transition duration-200 hover:scale-110"
                                    size="sm"
                                    onClick={() => {
                                      handleDeleteProject(proj._id);
                                    }}
                                  >
                                    <Trash2 size="18" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-hidden">
                              You have not added any project yet!
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

export default ManageProject;
