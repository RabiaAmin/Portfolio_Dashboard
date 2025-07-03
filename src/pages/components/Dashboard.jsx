import React from "react";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent} from "@/components/ui/tabs";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const { project } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);

  return (
    <div className="flex flex-col p-2">
      <main className="grid flex-1 items-start gap-4  sm:px-6 sm:py-0  md:gap-8 lg:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {user.aboutMe}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={user.portfolioUrl}>
                  <Button className="border bg-transparent border-primary text-primary hover:bg-primary hover:text-muted cursor-pointer">
                    Visit Portfolio
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Project Completed</CardTitle>
                <CardTitle className="text-6xl">
                  {project && project.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to="/manage/projects">
                  <Button className="border bg-transparent border-primary text-primary hover:bg-primary hover:text-muted cursor-pointer">
                    Manage Project
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Skills</CardTitle>
                <CardTitle className="text-6xl">
                  {skills && skills.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to="/manage/skills">
                  <Button className="border bg-transparent border-primary text-primary hover:bg-primary hover:text-muted cursor-pointer">
                    Manage Skill
                  </Button>
                </Link>
              </CardFooter>
            </Card>
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
                                <div className="flex gap-8  ">
                                  {skill.skills?.map((skill, idx) => (
                                    <p key={idx} className="truncate  bg-primary/40 py-1.5 px-3 rounded-md">
                                      {skill}
                                    </p>
                                  ))}
                                </div>
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
                                  href={proj.gitHubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  GitHub URL
                                </a>
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

export default Dashboard;
