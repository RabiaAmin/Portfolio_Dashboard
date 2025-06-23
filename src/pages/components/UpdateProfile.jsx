// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link } from "react-router-dom";
// import { Textarea } from "@/components/ui/textarea";

// function UpdateProfile() {
//   const {user,loading,error,isUpdated , message} = useSelector((state)=> state.user);

//   const [username,setUsername] = useState(user?.username);
//   const [email,setEmail] = useState(user?.email);
//   const [phone,setPhone] = useState(user?.phone);
//   const [aboutMe,setAboutMe] = useState(user?.aboutMe);
//   const [githubUrl,setGithubUrl] = useState(user?.githubUrl ?? "");
//   const [linkedInUrl,setLinedInUrl] = useState(user?.linkedInUrl ?? "");
//   const [instagramUrl,setInstagramUrl] = useState(user?.instagramUrl ?? "");
//   const [facebookUrl,setFacebookUrl] = useState(user?.facebookUrl ?? "");
//   const [avtar,setAvatar] = useState(user?.avtar?.url);
//   const [avtarPreview,setAvatarPreview] = useState("");
//   const [resume,setResume] = useState(user?.resume?.url);
//   const [resumePreview,setResumePreview] = useState("");
  
//    const dispatch = useDispatch();
//    const avatarHandle = ()=>{
//     const file = email.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload= ()=>{
//       setAvatarPreview(reader.result);
//       setAvatar(file);
//     }
//    }

//      const resumeHandle = ()=>{
//     const file = email.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload= ()=>{
//       setResumePreview(reader.result);
//       setResume(file);
//     }
//    }

//   return (
//      <>
//       <div className="w-full h-full">
//         <div>
//           <div className="grid w-[100%] gap-6">
//             <div className="grid gap-2">
//               <h1 className="text-2xl font-bold">Update Profile</h1>
//               <p className="text-gray-400">Update Your Profile</p>
//             </div>
//           <div className="grid gap-6">
//             <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row">
//               <div className="grid gap-4 w-full sm:w-72">
//                 <Label>Profile Image</Label>
//                 <img
//                   src={avtarPreview ? `${avtarPreview}`:'vite.svg'}
//                   alt="avatar"
//                   className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-contain border "
//                 />
//                 <Input className="" type="file" onChange={avatarHandle} />
//               </div>
//               <div className="grid gap-4">
//                 <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row">
//                   <div className="grid gap-2 w-full sm:w-72 ">
//                     <Label>Resume</Label>
//                     <img
//                       src={user && user.resume && user.resume.url}
//                       alt="resume"
//                       className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-contain border "
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="grid gap-2">
//               <Label>User Name</Label>
//               <Input type="text" defaultValue={user.username} disabled />
//             </div>
//              <div className="grid gap-2">
//               <Label>User Email</Label>
//               <Input type="email" defaultValue={user.email} disabled />
//             </div>
//              <div className="grid gap-2">
//               <Label>User Phone</Label>
//               <Input type="text" defaultValue={user.phone} disabled />
//             </div>
//              <div className="grid gap-2">
//               <Label>About Me</Label>
//               <Textarea  defaultValue={user.aboutMe} disabled />
//             </div>
//                <div className="grid gap-2">
//               <Label>LinkedIn Url</Label>
//               <Input  type="text"defaultValue={user.linkedInUrl ?? "Not Available yet"} disabled />
//             </div>
//                <div className="grid gap-2">
//               <Label>Instagram Url</Label>
//               <Input type="text" defaultValue={user.instagramUrl ?? "Not Available yet"} disabled />
//             </div>
//                <div className="grid gap-2">
//               <Label>GitHul Url</Label>
//               <Input type="text" defaultValue={user.githubUrl ?? "Not Available yet"} disabled />
//             </div>
//             <div className="grid gap-2">
//               <Label>Facebook Url</Label>
//               <Input type="text" defaultValue={user.facebookUrl ?? "Not Available yet"} disabled />
//             </div>
//           </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default UpdateProfile