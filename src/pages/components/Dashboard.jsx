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
import { Tabs, TabsContent } from "@/components/ui/tabs";
function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const { project } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  return (
    <>
      <div className="flex flex-col sm:gap-4  sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 ">
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
              <Card className="flex flex-col justify-center ">
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
              <Card className="flex flex-col justify-center ">
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
            <Tabs >
              <TabsContent >
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Demo URL</TableHead>
                          <TableHead>GitHub URL</TableHead>
                        </TableRow>
                      </TableHeader>
                    
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
