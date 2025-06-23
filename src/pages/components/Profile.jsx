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
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row">
              <div className="grid gap-4 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={user && user.avatar && user.avatar.url}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-contain border "
                />
              </div>
              <div className="grid gap-4">
                <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row">
                  <div className="grid gap-2 w-full sm:w-72 ">
                    <Label>Resume</Label>
                    <img
                      src={user && user.resume && user.resume.url}
                      alt="resume"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-contain border "
                    />
                  </div>
                </div>
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
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
