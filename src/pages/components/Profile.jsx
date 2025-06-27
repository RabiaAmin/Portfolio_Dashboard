import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
function Profile() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-gray-400">Full Profile Preview</p>
            </div>
          <div className="grid gap-6">
             <div className="flex flex-col lg:flex-row gap-6">
                      {/* Profile Image Section */}
                      <div className="grid gap-4 w-full sm:w-82">
                        <Label>Profile Image</Label>
                        <img
                          src={user.avatar.url}
                          alt="avatar"
                          className="w-full h-auto sm:h-72 rounded-2xl object-contain border"
                        />
                       
                      </div>
            
                      {/* Resume Section */}
                      <div className="grid gap-4 w-full">
                        <Label>Resume</Label>
                        {user.resume.url ? (
                          <div className="w-full relative border rounded-2xl overflow-hidden h-72">
                            <iframe
                              src={user.resume.url}
                              className="w-full h-full"
                              title="PDF Resume"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-72 border rounded-2xl text-muted-foreground text-sm">
                            No resume uploaded.
                          </div>
                        )}
                      
                      </div>
                    </div>
            <div className="grid gap-2">
              <Label>User Name</Label>
              <Input type="text" defaultValue={user.username} disabled />
            </div>
             <div className="grid gap-2">
              <Label>User Email</Label>
              <Input type="email" defaultValue={user.email} disabled />
            </div>
             <div className="grid gap-2">
              <Label>User Phone</Label>
              <Input type="text" defaultValue={user.phone} disabled />
            </div>
             <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea  defaultValue={user.aboutMe} disabled />
            </div>
               <div className="grid gap-2">
              <Label>LinkedIn Url</Label>
              <Input  type="text"defaultValue={user.linkedInUrl ?? "Not Available yet"} disabled />
            </div>
               <div className="grid gap-2">
              <Label>Instagram Url</Label>
              <Input type="text" defaultValue={user.instagramUrl ?? "Not Available yet"} disabled />
            </div>
               <div className="grid gap-2">
              <Label>GitHul Url</Label>
              <Input type="text" defaultValue={user.githubUrl ?? "Not Available yet"} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Facebook Url</Label>
              <Input type="text" defaultValue={user.facebookUrl ?? "Not Available yet"} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio Url</Label>
              <Input type="text" defaultValue={user.portfolioUrl ?? "Not Available yet"} disabled />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
